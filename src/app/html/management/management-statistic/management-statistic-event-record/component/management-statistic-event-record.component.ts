import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
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
  @Input() direction: 'row' | 'column' = 'column';
  @Input() load?: EventEmitter<void>;
  title = '今年预警';
}
