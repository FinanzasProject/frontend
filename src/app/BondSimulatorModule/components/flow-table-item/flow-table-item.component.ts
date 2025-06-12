import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../model/schedule';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-flow-table-item',
  imports: [
    TableModule,
    Button
  ],
  templateUrl: './flow-table-item.component.html',
  styleUrl: './flow-table-item.component.css'
})
export class FlowTableItemComponent implements OnInit {
  @Input() schedule: Schedule[] = [];
  @Input() bondName: string = "";
  cols!: Column[];
  exportColumns!: ExportColumn[];

  ngOnInit(): void {
    this.cols = [
      { field: 'period', header: 'Period', customExportHeader: 'Period' },
      { field: 'payment_date', header: 'Payment Date' },
      { field: 'starting_balance', header: 'Starting Balance' },
      { field: 'interest', header: 'Interest' },
      { field: 'principal', header: 'Amortization' },
      { field: 'total_payment', header: 'Total Payment' },
      { field: 'ending_balance', header: 'Ending Balance' },
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

  }

}
