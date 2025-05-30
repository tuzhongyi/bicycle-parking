import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../common/network/model/garbage-station/user.model';
import { LocalStorageService } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app-routing.path';
import { BicycleParkingHeaderDatetimeComponent } from '../bicycle-parking-header-datetime/bicycle-parking-header-datetime.component';
import { BicycleParkingHeaderOperationComponent } from '../bicycle-parking-header-operation/bicycle-parking-header-operation.component';

@Component({
  selector: 'howell-bicycle-parking-header',
  imports: [
    CommonModule,
    BicycleParkingHeaderDatetimeComponent,
    BicycleParkingHeaderOperationComponent,
  ],
  templateUrl: './bicycle-parking-header.component.html',
  styleUrl: './bicycle-parking-header.component.less',
})
export class BicycleParkingHeaderComponent {
  @Output() path = new EventEmitter<string>();
  get title() {
    return `${this.user?.FirstName ?? ''}${
      this.user?.LastName ?? ''
    }智慧车棚一网统管平台`;
  }

  constructor(local: LocalStorageService, private router: Router) {
    this.user = local.user;
  }

  user?: User;

  onpath() {
    let path = `/${RoutePath.bicycle_parking}/${RoutePath.management}`;
    this.router.navigateByUrl(path);
  }

  menu = {
    opened: false,
    on: {
      logout: () => {
        this.router.navigateByUrl(`/${RoutePath.login}`);
      },
    },
  };
}
