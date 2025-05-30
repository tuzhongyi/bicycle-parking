import { CommonModule } from '@angular/common';
import { ManagementHeaderComponent } from '../management-header/component/management-header.component';
import { ManagementStatisticDeviceComponent } from '../management-statistic/management-statistic-device/component/management-statistic-device.component';
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
];
