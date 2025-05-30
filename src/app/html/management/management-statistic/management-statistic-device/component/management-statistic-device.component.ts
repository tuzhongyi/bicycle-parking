import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { ManagementStatisticHeadComponent } from '../../management-statistic-head/management-statistic-head.component';
import { ManagementStatisticItemComponent } from '../management-statistic-item/management-statistic-item.component';
import { ManagementStatisticDeviceBusiness } from './management-statistic-device.business';

@Component({
  selector: 'howell-management-statistic-device',
  imports: [
    CommonModule,
    ManagementStatisticHeadComponent,
    ManagementStatisticItemComponent,
  ],
  templateUrl: './management-statistic-device.component.html',
  styleUrl: './management-statistic-device.component.less',
  providers: [ManagementStatisticDeviceBusiness],
})
export class ManagementStatisticDeviceComponent implements OnInit {
  constructor(
    private business: ManagementStatisticDeviceBusiness,
    private global: GlobalStorageService
  ) {}

  title = '统计数据';
  data: any;

  ngOnInit(): void {
    this.global.division.default.then((x) => {
      this.load(x.Id);
    });
  }

  load(divisionId: string) {
    this.business.load(divisionId).then((x) => {
      this.data = x;
    });
  }
}
