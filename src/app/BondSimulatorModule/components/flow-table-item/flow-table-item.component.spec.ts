import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTableItemComponent } from './flow-table-item.component';

describe('FlowTableItemComponent', () => {
  let component: FlowTableItemComponent;
  let fixture: ComponentFixture<FlowTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowTableItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
