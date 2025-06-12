import {Component, inject} from '@angular/core';
import {RegisterFormComponent} from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-view',
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.css'
})
export class RegisterViewComponent {
}
