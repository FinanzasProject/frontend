import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../services/bonds.service';
import { Bond } from '../../model/bond';
import { HistoricalBondItemComponent } from '../../components/historical-bond-item/historical-bond-item.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-historical-bond-view',
  imports: [HistoricalBondItemComponent],
  templateUrl: './historical-bond-view.component.html',
  styleUrl: './historical-bond-view.component.css',
})
export class HistoricalBondViewComponent implements OnInit {
  bonds: Bond[] = [];

  constructor(private bondService: BondsService) {}

  ngOnInit(): void {
    this.loadBonds();
  }

  async loadBonds() {
    try {
      this.bonds = await this.bondService.getAll();
    } catch (err) {
      console.error(err);
    }
  }

  onDeleteBond(id: number) {
    this.bondService.deleteBond(id).then(() => this.loadBonds());
  }
}
