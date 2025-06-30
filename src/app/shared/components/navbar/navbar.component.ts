import { Component, inject, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ColorSwitcherComponent } from '../color-switcher/color-switcher.component';
import { Ripple } from 'primeng/ripple';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    Toolbar,
    Avatar,
    Menu,
    Button,
    ColorSwitcherComponent,
    Ripple,
    TitleCasePipe,
    SidenavComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  title: string = '';
  visible: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.getTitle();
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  getTitle() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        const segments = url.replace(/\/$/, '').split('/');
        this.title = segments.pop()!;
        console.log(this.title);
      });
  }
  hideSidebar() {
    this.visible = false;
  }
  async logout() {
    await this.authService.signOut();
    await this.router.navigate(['/login']);
  }
}
