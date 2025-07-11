import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonGroup } from 'primeng/buttongroup';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Tooltip } from 'primeng/tooltip';
import { Ripple } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Schedule } from '../../model/schedule';
import { ScheduleTableDialogComponent } from '../schedule-table-dialog/schedule-table-dialog.component';
import { MessageService } from 'primeng/api';
import { BondsService } from '../../services/bonds.service';
import { Bond, NewBond } from '../../model/bond';

@Component({
  selector: 'app-bond-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    Select,
    DatePicker,
    ButtonGroup,
    Button,
    InputNumber,
    Tooltip,
    Ripple,
    StyleClassModule,
    ScheduleTableDialogComponent,
  ],
  templateUrl: './bond-form.component.html',
  standalone: true,
  styleUrl: './bond-form.component.css',
})
export class BondFormComponent implements OnInit {
  schedule: Schedule[] = [];
  dialogVisible: boolean = false;

  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private bondService = inject(BondsService);

  rateType: { label: string; name: string }[] = [];
  paymentFrequency: { label: string; name: string }[] = [];
  amortization_method: { label: string; name: string }[] = [];
  capitalizationOptions: { label: string; name: string }[] = [];
  bondForm = this.formBuilder.group(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      nominal_amount: new FormControl(null, [
        Validators.min(1),
        Validators.required,
      ]),
      interest_rate: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      rate_type: new FormControl(''),
      capitalization_period: new FormControl(''),
      payment_frequency: new FormControl('', Validators.required),
      amortization_method: new FormControl(''),
      term: new FormControl(null, [Validators.min(1)]),
      issue_date: new FormControl<Date | null>(null, Validators.required),
      total_grace: new FormControl(null, [Validators.min(0)]),
      partial_grace: new FormControl(null, [Validators.min(0)]),
      initial_cost: new FormControl(null, [Validators.min(0)]),
    },
    {
      validators: [this.partialGraceValidator],
    }
  );
  constructor() {}
  ngOnInit(): void {
    this.rateType = [
      { label: 'Nominal', name: 'nominal' },
      { label: 'Effective', name: 'effective' },
    ];

    this.paymentFrequency = [
      { label: 'Monthly', name: 'monthly' },
      { label: 'Bimonthly', name: 'bimonthly' },
      { label: 'Quarterly', name: 'quarterly' },
      { label: 'Semiannual', name: 'semiannual' },
      { label: 'Annual', name: 'annual' },
    ];

    this.amortization_method = [{ label: 'French', name: 'french' }];

    this.capitalizationOptions = [
      { label: 'Monthly', name: 'monthly' },
      { label: 'Bimonthly', name: 'bimonthly' },
      { label: 'Quarterly', name: 'quarterly' },
      { label: 'Semiannual', name: 'semiannual' },
      { label: 'Annual', name: 'annual' },
    ];
  }

  private partialGraceValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const total: number = control.get('total_grace')?.value;
    const partial: number = control.get('partial_grace')?.value;
    if (partial != 0 && total != 0 && partial > total) {
      return { partialGreaterThanTotal: true };
    }
    return null;
  }

  generateFrenchSchedule(): Array<Schedule> {
    // 1) extraigo y valido datos
    const val = this.bondForm.value as {
      nominal_amount: number | null;
      interest_rate: number | null;
      term: number | null;
      payment_frequency:
        | 'monthly'
        | 'bimonthly'
        | 'quarterly'
        | 'semiannual'
        | 'annual';
      issue_date: string | null;
      total_grace: number | null;
      partial_grace: number | null;
    };

    if (
      val.nominal_amount == null ||
      val.interest_rate == null ||
      val.term == null ||
      !val.payment_frequency ||
      !val.issue_date
    ) {
      console.error('Faltan datos obligatorios');
      return [];
    }

    const P = val.nominal_amount;
    const annual = val.interest_rate / 100;
    const months = val.term;
    const start = new Date(val.issue_date);

    // 2) configuración frecuencia
    const freqConfig: Record<
      string,
      { periodsPerYear: number; monthsPerPeriod: number }
    > = {
      monthly: { periodsPerYear: 12, monthsPerPeriod: 1 },
      bimonthly: { periodsPerYear: 6, monthsPerPeriod: 2 },
      quarterly: { periodsPerYear: 4, monthsPerPeriod: 3 },
      semiannual: { periodsPerYear: 2, monthsPerPeriod: 6 },
      annual: { periodsPerYear: 1, monthsPerPeriod: 12 },
    };
    const cfg = freqConfig[val.payment_frequency];
    if (!cfg)
      throw new Error(`Frecuencia desconocida: ${val.payment_frequency}`);

    // 3) periodo francés normal
    const r = annual / cfg.periodsPerYear;
    const amortPeriods = Math.ceil(months / cfg.monthsPerPeriod);
    const A =
      (P * r * Math.pow(1 + r, amortPeriods)) /
      (Math.pow(1 + r, amortPeriods) - 1);

    // 4) lees los periodos de gracia
    const totalGrace = val.total_grace || 0;
    const partialGrace = val.partial_grace || 0;

    // 5) bucle unificado
    const schedule = [];
    let balance = P;
    let currentDate = new Date(start);

    // Total de filas = totalGrace + partialGrace + amortPeriods
    const totalRows = totalGrace + partialGrace + amortPeriods;

    for (let k = 1; k <= totalRows; k++) {
      // avanzamos fecha
      currentDate = new Date(currentDate);
      currentDate.setMonth(currentDate.getMonth() + cfg.monthsPerPeriod);

      const row: any = {
        period: k,
        payment_date: currentDate.toISOString().split('T')[0],
        starting_balance: +balance.toFixed(2),
        interest: 0,
        principal: 0,
        total_payment: 0,
        ending_balance: +balance.toFixed(2),
      };

      if (k <= totalGrace) {
        // *** periodo TOTAL grace: sin pagos
        // interest, principal y total_payment ya quedan en 0
      } else if (k <= totalGrace + partialGrace) {
        // *** periodo PARTIAL grace: sólo interés
        const interest = balance * r;
        row.interest = +interest.toFixed(2);
        row.total_payment = +interest.toFixed(2);
        // balance no cambia
      } else {
        // *** periodo normal francés
        const interest = balance * r;
        const principal = A - interest;
        const ending = balance - principal;

        row.interest = +interest.toFixed(2);
        row.principal = +principal.toFixed(2);
        row.total_payment = +A.toFixed(2);
        row.ending_balance = +ending.toFixed(2);

        balance = ending;
      }

      schedule.push(row);
    }

    return schedule;
  }

  generateSchedule() {
    this.schedule = this.generateFrenchSchedule();
    if (this.schedule.length > 0) {
      this.showDialog();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Schedule generated successfully',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Schedule generation failed',
        life: 3000,
      });
    }
  }
  saveForm() {
    if (this.bondForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Bond',
        detail: 'Bond form invalid',
        life: 3000,
      });
      return;
    }
    this.createBond();
  }
  async createBond() {
    const fv = this.bondForm.value;

    const raw = fv.issue_date as Date;
    if (!raw) throw new Error('Issue date es obligatorio');

    const issue_date = raw.toISOString().split('T')[0];

    let newBond: NewBond = {
      name: fv.name!,
      issue_date: issue_date,
      nominal_amount: fv.nominal_amount!,
      interest_rate: fv.interest_rate!,
      rate_type: fv.rate_type!,
      rate_period: fv.capitalization_period!,
      payment_frequency: fv.payment_frequency!,
      amortization_method: fv.amortization_method!,
      term: fv.term!,
      total_grace: fv.total_grace!,
      partial_grace: fv.partial_grace!,
      initial_cost: fv.initial_cost!,
      schedule: this.generateFrenchSchedule(),
    };
    this.schedule = this.generateFrenchSchedule();
    this.bondService.createBond(newBond).then((bond) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Bond created successfully',
        life: 3000,
      });
      this.resetForm();

      this.showDialog();
    });
  }

  resetForm() {
    this.bondForm.reset();
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Form reset successfully',
      life: 3000,
    });
  }

  showDialog() {
    this.dialogVisible = true;
  }

  dialogVisibleChange(event: boolean) {
    this.dialogVisible = event;
  }
}
