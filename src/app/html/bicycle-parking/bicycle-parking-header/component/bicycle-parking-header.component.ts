import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../common/network/model/garbage-station/user.model';
import { ConfigRequestService } from '../../../../common/network/request/config/config-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
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
    }安消一体化一网统管预警平台`;
  }

  constructor(
    local: LocalStorageService,
    private router: Router,
    private global: GlobalStorageService,
    private config: ConfigRequestService
  ) {
    this.user = local.user;
    this.check();
  }

  user?: User;

  onpath() {
    let path = `/${RoutePath.bicycle_parking}/${RoutePath.management}`;
    this.router.navigateByUrl(path);
  }

  private check() {
    this.config.version.then((version) => {
      if (this.global.version != version) {
        location.replace(location.href);
      }
    });
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
