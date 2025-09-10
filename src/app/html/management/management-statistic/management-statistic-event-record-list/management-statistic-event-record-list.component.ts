import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { SensorEventRecord } from '../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { BicycleParkingContainerEventRecordListComponent } from '../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-event-record/bicycle-parking-container-event-record-list/bicycle-parking-container-event-record-list.component';
import { ManagementStatisticHeadComponent } from '../management-statistic-head/management-statistic-head.component';

@Component({
  selector: 'howell-management-statistic-event-record-list',
  imports: [
    CommonModule,
    FormsModule,
    ManagementStatisticHeadComponent,
    BicycleParkingContainerEventRecordListComponent,
  ],
  templateUrl: './management-statistic-event-record-list.component.html',
  styleUrl: './management-statistic-event-record-list.component.less',
})
export class ManagementStatisticEventRecordListComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Output() picture = new EventEmitter<SensorEventRecord>();
  @Output() video = new EventEmitter<SensorEventRecord>();
  constructor(private global: GlobalStorageService) {}
  title = '火灾预警事件';
  Unit = TimeUnit;

  private subscription = new Subscription();
  table = {
    load: new EventEmitter<string>(),
    unit: TimeUnit.Year,
  };

  ngOnInit(): void {
    this.regist();
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
      this.table.load.emit(division.Id);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    picture: (data: SensorEventRecord) => {
      this.picture.emit(data);
    },
    video: (data: SensorEventRecord) => {
      this.video.emit(data);
    },
  };
}
