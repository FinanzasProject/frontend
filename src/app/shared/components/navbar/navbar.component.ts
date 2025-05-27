import {Component, OnInit} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Avatar} from 'primeng/avatar';
import {Menu} from 'primeng/menu';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {ColorSwitcherComponent} from '../color-switcher/color-switcher.component';
import {Ripple} from 'primeng/ripple';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {TitleCasePipe, UpperCasePipe} from '@angular/common';
import {SidenavComponent} from '../sidenav/sidenav.component';

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
    SidenavComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  title: string = '';
  visible : boolean = false;

  constructor(private router: Router) {
  }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.getTitle()
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh'
          },
          {
            label: 'Export',
            icon: 'pi pi-upload'
          }
        ]
      }
    ];
  }

  getTitle(){
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      const url = e.urlAfterRedirects;
      const segments = url.replace(/\/$/, '').split('/');
      this.title = segments.pop()!;
      console.log(this.title);
    });
  }
  hideSidebar(){
    this.visible = false;
  }


}
