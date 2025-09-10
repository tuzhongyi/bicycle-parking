import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../common/network/model/garbage-station/user.model';
import { LocalStorageService } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app-routing.path';
import { ManagementHeaderDatetimeComponent } from '../management-header-datetime/management-header-datetime.component';
import { ManagementHeaderOperationComponent } from '../management-header-operation/management-header-operation.component';

@Component({
  selector: 'howell-management-header',
  imports: [
    CommonModule,
    ManagementHeaderDatetimeComponent,
    ManagementHeaderOperationComponent,
  ],
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.less'],
})
export class ManagementHeaderComponent {
  @Output() path = new EventEmitter<string>();
  get title() {
    return `${this.user?.FirstName ?? ''}${
      this.user?.LastName ?? ''
    }安消一体化一网统管预警平台`;
  }

  constructor(private local: LocalStorageService, private router: Router) {
    this.user = local.user;
  }

  user?: User;

  onpath() {
    let path = `/${RoutePath.bicycle_parking}`;
    this.router.navigateByUrl(path);
    // console.log(path);
    // // this.router.parseUrl(path);
    // location.href = path;
    // this.path.emit(path);
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
