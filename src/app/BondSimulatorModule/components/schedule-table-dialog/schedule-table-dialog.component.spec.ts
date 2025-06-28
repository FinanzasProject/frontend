import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTableDialogComponent } from './schedule-table-dialog.component';

describe('ScheduleTableDialogComponent', () => {
  let component: ScheduleTableDialogComponent;
  let fixture: ComponentFixture<ScheduleTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleTableDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
