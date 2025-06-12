import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalBondViewComponent } from './historical-bond-view.component';

describe('HistoricalBondViewComponent', () => {
  let component: HistoricalBondViewComponent;
  let fixture: ComponentFixture<HistoricalBondViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalBondViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalBondViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
