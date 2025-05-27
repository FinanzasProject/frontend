import { Component } from '@angular/core';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-color-switcher',
  imports: [
    ToggleSwitch,
    FormsModule
  ],
  templateUrl: './color-switcher.component.html',
  styleUrl: './color-switcher.component.css'
})
export class ColorSwitcherComponent {
  toggleDarkMode(){
    const element = document.querySelector('html');
    if(element !== null){
      element.classList.toggle('p-dark');
    }
  }
}
