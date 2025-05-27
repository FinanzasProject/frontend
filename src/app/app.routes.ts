import { Routes } from '@angular/router';
import {DashboardViewComponent} from './BondSimulatorModule/pages/dashboard-view/dashboard-view.component';
import {
  SimulateCashFlowViewComponent
} from './BondSimulatorModule/pages/simulate-cash-flow-view/simulate-cash-flow-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardViewComponent },
  { path: 'simulate', component: SimulateCashFlowViewComponent },
];

