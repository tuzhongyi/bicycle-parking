import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePath } from '../app-routing.path';
import { BicycleParkingContainerComponent } from './bicycle-parking-container/component/bicycle-parking-container.component';
import { BicycleParkingComponent } from './component/bicycle-parking.component';

const routes: Routes = [
  {
    path: '',
    component: BicycleParkingComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: BicycleParkingContainerComponent,
      },
      {
        path: RoutePath.management,
        loadChildren: () =>
          import('../management/management.module').then(
            (mod) => mod.ManagementModule
          ),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class BicycleParkingRoutingModule {}
