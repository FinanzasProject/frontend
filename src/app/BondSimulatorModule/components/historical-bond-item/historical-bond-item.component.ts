import {Component, Input} from '@angular/core';
import {Bond} from '../../model/bond';
import {Ripple} from 'primeng/ripple';
import {StyleClass} from 'primeng/styleclass';
import {FlowTableItemComponent} from '../flow-table-item/flow-table-item.component';
import {SummaryViewComponent} from '../summary-view/summary-view.component';

@Component({
  selector: 'li[historical-bond-item]',
  imports: [
    Ripple,
    StyleClass,
    FlowTableItemComponent,
    SummaryViewComponent
  ],
  templateUrl: './historical-bond-item.component.html',
  styleUrl: './historical-bond-item.component.css'
})
export class HistoricalBondItemComponent {
  @Input() bond!: Bond;
}
