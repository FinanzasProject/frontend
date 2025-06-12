import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {LoginViewComponent} from './auth/pages/login-view/login-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoginViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BondCash';
  constructor(public router:Router) {
  }
  hideToolbarRoutes():boolean{
    const currentUrl = this.router.url;
    return !['/login', '/register'].includes(currentUrl);
  }
}
