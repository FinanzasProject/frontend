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

  rateType: any[] | undefined;
  paymentFrequency: any[] | undefined;
  amortization_method: any[] | undefined;
  capitalizationOptions: any[] | undefined;
  private formBuilder = inject(FormBuilder);
  bondForm = this.formBuilder.group(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      nominal_amount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
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
      issue_date: new FormControl(null, Validators.required),
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
    this.rateType = [{ name: 'nominal' }, { name: 'effective' }];
    this.paymentFrequency = [
      { label: 'Monthly', name: 'monthly' },
      { label: 'Bimonthly', name: 'bimonthly' },
      { label: 'Quarterly', name: 'quarterly' },
      { label: 'Semiannual', name: 'semiannual' },
      { label: 'Annual', name: 'annual' },
    ];
    this.amortization_method = [{ name: 'french' }];
    this.capitalizationOptions = [
      { name: 'monthly' },
      { name: 'bimonthly' },
      { name: 'quarterly' },
      { name: 'semiannual' },
      { name: 'annual' },
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

  generateFrenchSchedule(): Array<{
    period: number;
    payment_date: string;
    starting_balance: number;
    interest: number;
    principal: number;
    total_payment: number;
    ending_balance: number;
  }> {
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
    this.showDialog();
  }

  resetForm() {
    this.bondForm.reset();
  }

  showDialog() {
    this.dialogVisible = true;
  }

  dialogVisibleChange(event: boolean) {
    this.dialogVisible = event;
  }
}
