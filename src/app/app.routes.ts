import { Routes } from '@angular/router';
import {DashboardViewComponent} from './BondSimulatorModule/pages/dashboard-view/dashboard-view.component';
import {
  SimulateCashFlowViewComponent
} from './BondSimulatorModule/pages/simulate-cash-flow-view/simulate-cash-flow-view.component';
import {
  HistoricalBondViewComponent
} from './BondSimulatorModule/pages/historical-bond-view/historical-bond-view.component';
import { RegisterViewComponent } from './auth/pages/register-view/register-view.component';
import { LoginViewComponent } from './auth/pages/login-view/login-view.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: DashboardViewComponent, canActivate: [authGuard] },
  { path: 'simulate', component: SimulateCashFlowViewComponent, canActivate: [authGuard] },
  { path: 'historical-bond', component: HistoricalBondViewComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegisterViewComponent }
];

