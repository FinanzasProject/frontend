import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {ButtonGroup} from 'primeng/buttongroup';
import {Button} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {Tooltip} from 'primeng/tooltip';
import {Ripple} from 'primeng/ripple';
import { StyleClassModule} from 'primeng/styleclass';

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
    StyleClassModule
  ],
  templateUrl: './bond-form.component.html',
  standalone: true,
  styleUrl: './bond-form.component.css'
})
export class BondFormComponent implements OnInit {
  rateType: any[] | undefined;
  paymentFrequency : any[] | undefined;
  amortization_method: any[] | undefined;
  capitalizationOptions : any[] | undefined;
  private formBuilder= inject(FormBuilder);
  bondForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required,Validators.maxLength(50), Validators.minLength(3),Validators.maxLength(50)]),
    nominal_amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    interest_rate: new FormControl(null, [Validators.required,Validators.min(0)]) ,
    rate_type: new FormControl('', ),
    capitalization_period: new FormControl('', ),
    payment_frequency: new FormControl('',Validators.required),
    amortization_method: new FormControl(''),
    term: new FormControl(null, [Validators.min(1)]),
    issue_date: new FormControl(null, Validators.required),
    total_grace: new FormControl(null,[Validators.min(0)]),
    partial_grace: new FormControl(null,[Validators.min(0)]),
    initial_cost: new FormControl(null, [Validators.min(0)]),
  },{
    validators: [this.partialGraceValidator],

  })
  constructor() {
  }
  ngOnInit(): void {
    this.rateType = [
      {name: 'nominal'},
      {name: 'effective'},
    ]
    this.paymentFrequency = [
      {name:'monthly'},
      {name:'bimonthly'},
      {name:'quarterly'},
      {name:'semiannual'},
      {name:'annual'},
    ]
    this.amortization_method = [
      {name:'french'},
    ]
    this.capitalizationOptions = [
      {name:'monthly'},
      {name:'bimonthly'},
      {name:'quarterly'},
      {name:'semiannual'},
      {name:'annual'},
    ]
  }

  private partialGraceValidator(control:AbstractControl):ValidationErrors | null {

    const total: number = control.get('total_grace')?.value;
    const partial : number = control.get('partial_grace')?.value
    if(partial != 0 && total != 0 && partial>total){
      return {partialGreaterThanTotal: true}
    }
    return null;
  }
  resetForm(): void {
    this.bondForm.reset();
  }

}
