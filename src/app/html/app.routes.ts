import { Routes } from '@angular/router';
import { AuthorizationActivate } from '../common/network/request/auth/authorization.activate';
import { RoutePath } from './app-routing.path';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.management,
    loadChildren: () =>
      import('./management/management.module').then(
        (mod) => mod.ManagementModule
      ),
    canActivate: [AuthorizationActivate],
  },
  {
    path: RoutePath.bicycle_parking,
    loadChildren: () =>
      import('./bicycle-parking/bicycle-parking.module').then(
        (mod) => mod.BicycleParkingModule
      ),
    canActivate: [AuthorizationActivate],
  },
];
