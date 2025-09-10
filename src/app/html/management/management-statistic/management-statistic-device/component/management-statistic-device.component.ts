import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class ManagementStatisticDeviceComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  constructor(
    private business: ManagementStatisticDeviceBusiness,
    private global: GlobalStorageService
  ) {}

  title = '统计数据';
  data: any;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  private load() {
    this.global.division.default.then((division) => {
      this.business.load(division.Id).then((x) => {
        this.data = x;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
