import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Card} from 'primeng/card';
import {IconField} from 'primeng/iconfield';
import {IftaLabel} from 'primeng/iftalabel';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [
    ButtonDirective,
    ButtonLabel,
    Card,
    IconField,
    IftaLabel,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    Ripple,
    RouterLink
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
  }
  registerForm = new FormGroup({
    email: new FormControl<any>('', [Validators.required,Validators.email]),
    password: new FormControl<any>('', Validators.required),
  })

  onSubmit(){
    this.authService.signUp(this.registerForm.value.email,this.registerForm.value.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {})
  }

}
