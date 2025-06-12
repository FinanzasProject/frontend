import { Component, OnInit } from '@angular/core';
import {BondsService} from '../../services/bonds.service';
import {Bond} from '../../model/bond';
import {HistoricalBondItemComponent} from '../../components/historical-bond-item/historical-bond-item.component';

@Component({
  selector: 'app-historical-bond-view',
  imports: [
    HistoricalBondItemComponent
  ],
  templateUrl: './historical-bond-view.component.html',
  styleUrl: './historical-bond-view.component.css'
})
export class HistoricalBondViewComponent implements OnInit {
  bonds: Bond[] = [];
  constructor(private bondService : BondsService) {
  }

  ngOnInit(): void {
    this.loadBonds();

  }

  loadBonds(): void {
    this.bondService.getAll().subscribe({
      next:(response) => {
        this.bonds = response;
        console.log(this.bonds)
      },
      error: (error) => {
        console.log("Error al traer datos", error);
      }
    })
  }

}
