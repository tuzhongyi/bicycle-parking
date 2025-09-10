import { CommonModule } from '@angular/common';
import { PictureListComponent } from '../../../common/components/picture/picture-list/picture-list.component';
import { BicycleParkingVideoWindowComponent } from '../../bicycle-parking/bicycle-parking-video/bicycle-parking-video-window/bicycle-parking-video-window.component';
import { BicycleParkingWindowComponent } from '../../bicycle-parking/bicycle-parking-window/bicycle-parking-window.component';
import { ManagementHeaderComponent } from '../management-header/component/management-header.component';
import { ManagementStatisticAlarmComponent } from '../management-statistic/management-statistic-alarm/management-statistic-alarm.component';
import { ManagementStatisticDeviceComponent } from '../management-statistic/management-statistic-device/component/management-statistic-device.component';
import { ManagementStatisticEventRecordListComponent } from '../management-statistic/management-statistic-event-record-list/management-statistic-event-record-list.component';
import { ManagementStatisticEventRecordComponent } from '../management-statistic/management-statistic-event-record/component/management-statistic-event-record.component';
import { ManagementStatisticStructureComponent } from '../management-statistic/management-statistic-structure/management-statistic-structure.component';
import { ManagementStatisticTaskComponent } from '../management-statistic/management-statistic-task/component/management-statistic-task.component';

export const ManagementContainerImports = [
  CommonModule,
  ManagementHeaderComponent,
  ManagementStatisticDeviceComponent,
  ManagementStatisticEventRecordComponent,
  ManagementStatisticTaskComponent,
  ManagementStatisticStructureComponent,
  ManagementStatisticEventRecordListComponent,
  ManagementStatisticAlarmComponent,

  PictureListComponent,
  BicycleParkingWindowComponent,
  BicycleParkingVideoWindowComponent,
];
