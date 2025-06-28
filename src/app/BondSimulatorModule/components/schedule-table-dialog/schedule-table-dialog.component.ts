import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Schedule } from '../../model/schedule';
import { DialogModule } from 'primeng/dialog';
import { FlowTableItemComponent } from '../flow-table-item/flow-table-item.component';

@Component({
  selector: 'app-schedule-table-dialog',
  imports: [DialogModule, FlowTableItemComponent],
  templateUrl: './schedule-table-dialog.component.html',
  styleUrl: './schedule-table-dialog.component.css',
})
export class ScheduleTableDialogComponent {
  @Input() schedule: Schedule[] = [];
  @Input() bondName: string = '';
  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  constructor() {}

  toggleDialog() {
    this.dialogVisible = false;
    this.dialogVisibleChange.emit(this.dialogVisible);
  }
}
