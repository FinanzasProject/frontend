import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {RouterLink} from '@angular/router';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-sidenav',
  imports: [
    Drawer,
    RouterLink,
    Ripple
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<void> = new EventEmitter();
  @ViewChild('drawer') drawer!: Drawer;

  closeCallBack(e: Event): void {
    this.drawer.close(e);
  }
  onHide(){
    this.visibleChange.emit();
  }
}
