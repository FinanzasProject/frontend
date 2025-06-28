import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BondCash';
  constructor(private router: Router, public messageService: MessageService) {}
  hideToolbarRoutes(): boolean {
    const currentUrl = this.router.url;
    return !['/login', '/register'].includes(currentUrl);
  }
}
