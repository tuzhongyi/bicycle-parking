import { CommonModule } from '@angular/common';
import { PictureListComponent } from '../../../../common/components/picture/picture-list/picture-list.component';
import { BicycleParkingCardComponent } from '../../bicycle-parking-card/component/bicycle-parking-card.component';
import { BicycleParkingDetailsComponent } from '../../bicycle-parking-details/component/bicycle-parking-details.component';
import { BicycleParkingHeaderComponent } from '../../bicycle-parking-header/component/bicycle-parking-header.component';
import { BicycleParkingMapStateComponent } from '../../bicycle-parking-map-state/component/bicycle-parking-map-state.component';
import { BicycleParkingMapComponent } from '../../bicycle-parking-map/bicycle-parking-map.component';
import { BicycleParkingRecordSensorTableManagerComponent } from '../../bicycle-parking-table/bicycle-parking-record-sensor-table/bicycle-parking-record-sensor-table-manager/bicycle-parking-record-sensor-table-manager.component';
import { BicycleParkingRecordSmokeTableManagerComponent } from '../../bicycle-parking-table/bicycle-parking-record-smoke-table/bicycle-parking-record-smoke-table-manager/bicycle-parking-record-smoke-table-manager.component';
import { BicycleParkingRecordThirdPartTableManagerComponent } from '../../bicycle-parking-table/bicycle-parking-record-thirdpart-table/bicycle-parking-record-thirdpart-table-manager/bicycle-parking-record-thirdpart-table-manager.component';
import { BicycleParkingStationTableManagerComponent } from '../../bicycle-parking-table/bicycle-parking-station-table/bicycle-parking-station-table-manager/bicycle-parking-station-table-manager.component';
import { BicycleParkingVideoWindowComponent } from '../../bicycle-parking-video/bicycle-parking-video-window/bicycle-parking-video-window.component';
import { BicycleParkingWindowComponent } from '../../bicycle-parking-window/bicycle-parking-window.component';
import { BicycleParkingContainerDeviceComponent } from '../bicycle-parking-container-device/component/bicycle-parking-container-device.component';
import { BicycleParkingContainerDivisionComponent } from '../bicycle-parking-container-division/component/bicycle-parking-container-division.component';
import { BicycleParkingContainerEventRecordChartLineComponent } from '../bicycle-parking-container-event-record/bicycle-parking-container-event-record-chart/bicycle-parking-container-event-record-chart-line/bicycle-parking-container-event-record-chart-line.component';
import { BicycleParkingContainerEventRecordChartPieContainerComponent } from '../bicycle-parking-container-event-record/bicycle-parking-container-event-record-chart/bicycle-parking-container-event-record-chart-pie-container/bicycle-parking-container-event-record-chart-pie-container.component';
import { BicycleParkingContainerEventRecordChartPieComponent } from '../bicycle-parking-container-event-record/bicycle-parking-container-event-record-chart/bicycle-parking-container-event-record-chart-pie/bicycle-parking-container-event-record-chart-pie.component';
import { BicycleParkingContainerEventRecordListComponent } from '../bicycle-parking-container-event-record/bicycle-parking-container-event-record-list/bicycle-parking-container-event-record-list.component';
import { BicycleParkingContainerTaskComponent } from '../bicycle-parking-container-task/component/bicycle-parking-container-task.component';

export const garbageManagementContainerImports = [
  CommonModule,
  BicycleParkingHeaderComponent,
  BicycleParkingMapComponent,

  BicycleParkingCardComponent,

  BicycleParkingContainerDivisionComponent,
  BicycleParkingContainerDeviceComponent,
  BicycleParkingContainerTaskComponent,
  BicycleParkingContainerEventRecordChartPieComponent,
  BicycleParkingContainerEventRecordChartPieContainerComponent,
  BicycleParkingContainerEventRecordChartLineComponent,
  BicycleParkingContainerEventRecordListComponent,

  BicycleParkingMapStateComponent,

  BicycleParkingWindowComponent,
  PictureListComponent,
  BicycleParkingDetailsComponent,
  BicycleParkingVideoWindowComponent,
  BicycleParkingStationTableManagerComponent,
  BicycleParkingRecordSmokeTableManagerComponent,
  BicycleParkingRecordSensorTableManagerComponent,
  BicycleParkingRecordThirdPartTableManagerComponent,
];
