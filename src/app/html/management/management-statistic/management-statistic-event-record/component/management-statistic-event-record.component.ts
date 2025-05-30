import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManagementStatisticHeadComponent } from '../../management-statistic-head/management-statistic-head.component';
import { ManagementStatisticEventRecordChartComponent } from '../management-statistic-event-record-chart/management-statistic-event-record-chart.component';

@Component({
  selector: 'howell-management-statistic-event-record',
  imports: [
    CommonModule,
    ManagementStatisticHeadComponent,
    ManagementStatisticEventRecordChartComponent,
  ],
  templateUrl: './management-statistic-event-record.component.html',
  styleUrl: './management-statistic-event-record.component.less',
})
export class ManagementStatisticEventRecordComponent {
  title = '本月预警';
}
