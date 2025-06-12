import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonLabel} from "primeng/button";
import {Card} from "primeng/card";
import {IconField} from "primeng/iconfield";
import {IftaLabel} from "primeng/iftalabel";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private formBuilder= inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}
  loginForm = new FormGroup({
    email: new FormControl<any>('', [Validators.required,Validators.email]),
    password: new FormControl<any>('', Validators.required),
  })
  async loginUser() {
    this.authService.signIn(this.loginForm.value.email,this.loginForm.value.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {})

    await this.router.navigate(['/home']);
  }
}
