import {Component} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-view',
  imports: [
    ReactiveFormsModule,
    LoginFormComponent,
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
}
