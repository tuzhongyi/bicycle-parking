import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ManagementStatisticEventRecordChartComponent implements OnInit {
  count?: [number, number, number];
  values?: number[][];

  constructor(
    private pie: BicycleParkingContainerEventRecordChartPieBusiness,
    private line: BicycleParkingContainerEventRecordChartLineBusiness,
    private global: GlobalStorageService
  ) {}

  ngOnInit(): void {
    this.global.division.default.then((x) => {
      this.load(x.Id);
    });
  }

  private load(divisionId: string) {
    this.pie.load(divisionId).then((x) => {
      this.count = [x.smoker, x.charger, x.spray];
    });
    this.line.load(divisionId).then((x) => {
      this.values = [x.smoker, x.charger, x.spray];
    });
  }
}
