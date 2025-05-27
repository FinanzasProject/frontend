import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateCashFlowViewComponent } from './simulate-cash-flow-view.component';

describe('SimulateCashFlowViewComponent', () => {
  let component: SimulateCashFlowViewComponent;
  let fixture: ComponentFixture<SimulateCashFlowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateCashFlowViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateCashFlowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
