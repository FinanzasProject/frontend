import { Component } from '@angular/core';
import {Divider} from 'primeng/divider';
import {BondFormComponent} from '../../components/bond-form/bond-form.component';

@Component({
  selector: 'app-simulate-cash-flow-view',
  imports: [
    Divider,
    BondFormComponent
  ],
  templateUrl: './simulate-cash-flow-view.component.html',
  styleUrl: './simulate-cash-flow-view.component.css'
})
export class SimulateCashFlowViewComponent {

}
