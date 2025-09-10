import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { BicycleParkingContainerEventRecordChartLineBusiness } from '../../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-event-record/bicycle-parking-container-event-record-chart/bicycle-parking-container-event-record-chart-line/bicycle-parking-container-event-record-chart-line.business';
import { BicycleParkingContainerEventRecordChartPieBusiness } from '../../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-event-record/bicycle-parking-container-event-record-chart/bicycle-parking-container-event-record-chart-pie/bicycle-parking-container-event-record-chart-pie.business';
import { BicycleParkingContainerEventRecordService } from '../../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-event-record/service/bicycle-parking-container-event-record.service';
import { ManagementStatisticEventRecordChartLineComponent } from '../management-statistic-event-record-chart-line/management-statistic-event-record-chart-line.component';
import { ManagementStatisticEventRecordChartPieComponent } from '../management-statistic-event-record-chart-pie/management-statistic-event-record-chart-pie.component';

@Component({
  selector: 'howell-management-statistic-event-record-chart',
  imports: [
    CommonModule,
    ManagementStatisticEventRecordChartPieComponent,
    ManagementStatisticEventRecordChartLineComponent,
  ],
  templateUrl: './management-statistic-event-record-chart.component.html',
  styleUrl: './management-statistic-event-record-chart.component.less',
  providers: [
    BicycleParkingContainerEventRecordService,
    BicycleParkingContainerEventRecordChartPieBusiness,
    BicycleParkingContainerEventRecordChartLineBusiness,
  ],
})
export class ManagementStatisticEventRecordChartComponent
  implements OnInit, OnDestroy
{
  @Input() direction: 'row' | 'column' = 'column';
  @Input('load') _load?: EventEmitter<void>;

  count?: [number, number, number];
  values?: number[][];

  constructor(
    private pie: BicycleParkingContainerEventRecordChartPieBusiness,
    private line: BicycleParkingContainerEventRecordChartLineBusiness,
    private global: GlobalStorageService
  ) {}
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
    let unit = TimeUnit.Year; // 默认按年统计
    this.global.division.default.then((division) => {
      this.pie.load(division.Id, unit).then((x) => {
        this.count = [x.smoker, x.charger, x.spray];
      });
      this.line.load(division.Id, unit).then((x) => {
        this.values = [x.smoker, x.charger, x.spray];
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
