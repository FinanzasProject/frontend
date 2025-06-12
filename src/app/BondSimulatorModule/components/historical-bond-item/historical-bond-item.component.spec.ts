import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalBondItemComponent } from './historical-bond-item.component';

describe('HistoricalBondItemComponent', () => {
  let component: HistoricalBondItemComponent;
  let fixture: ComponentFixture<HistoricalBondItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalBondItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalBondItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
