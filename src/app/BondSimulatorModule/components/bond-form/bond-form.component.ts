import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-bond-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    Select,
    DatePicker
  ],
  templateUrl: './bond-form.component.html',
  styleUrl: './bond-form.component.css'
})
export class BondFormComponent implements OnInit {
  rateType: any[] | undefined;
  paymentFrequency : any[] | undefined;
  amortization_method: any[] | undefined;
  private formBuilder= inject(FormBuilder);
  bondForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required,Validators.maxLength(50), Validators.minLength(3),Validators.maxLength(20)]),
    nominal_amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    interest_rate: new FormControl(0, [Validators.required,Validators.min(0)]) ,
    rate_type: new FormControl('', ),
    payment_frequency: new FormControl(''),
    amortization_method: new FormControl(''),
    term: new FormControl(0, [Validators.required,Validators.min(1)]),
    total_grace: new FormControl(0,[Validators.required,Validators.min(1)]),
    partial_grace: new FormControl(0,[Validators.required,Validators.min(1)]),
    initial_cost: new FormControl('', [Validators.required,Validators.min(1)]),
    issue_date: new FormControl(''),
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
      {name:'daily'},
      {name:'weekly'},
      {name:'monthly'},
      {name:'bimonthly'},
      {name:'quarterly'},
      {name:'semiannual'},
      {name:'annual'},
      {name:'bullet'},
    ]
    this.amortization_method = [
      {name:'french'},
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

}
