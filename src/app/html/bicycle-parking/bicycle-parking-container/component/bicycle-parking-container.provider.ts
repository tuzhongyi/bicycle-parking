import { BicycleParkingContainerMapController } from './controller/bicycle-parking-container-map.controller';
import { BicycleParkingContainerStateController } from './controller/bicycle-parking-container-state.controller';
import { BicycleParkingContainerVideoController } from './controller/bicycle-parking-container-video.controller';
import { BicycleParkingContainerController } from './controller/bicycle-parking-container.controller';
import { BicycleParkingContainerCardDeviceController } from './controller/card/bicycle-parking-container-card-device.controller';
import { BicycleParkingContainerCardDivisionController } from './controller/card/bicycle-parking-container-card-division.controller';
import { BicycleParkingContainerCardTaskController } from './controller/card/bicycle-parking-container-card-task.controller';
import { BicycleParkingContainerCardController } from './controller/card/bicycle-parking-container-card.controller';
import { BicycleParkingContainerCardEventRecordChartLineController } from './controller/card/event-record/bicycle-parking-container-card-event-record-chart-line.controller';
import { BicycleParkingContainerCardEventRecordChartPieController } from './controller/card/event-record/bicycle-parking-container-card-event-record-chart-pie.controller';
import { BicycleParkingContainerCardEventRecordChartController } from './controller/card/event-record/bicycle-parking-container-card-event-record-chart.controller';
import { BicycleParkingContainerCardEventRecordListController } from './controller/card/event-record/bicycle-parking-container-card-event-record-list.controller';
import { BicycleParkingContainerCardEventRecordController } from './controller/card/event-record/bicycle-parking-container-card-event-record.controller';

const controllers = [
  BicycleParkingContainerCardDivisionController,
  BicycleParkingContainerCardDeviceController,
  BicycleParkingContainerCardTaskController,
  BicycleParkingContainerCardEventRecordListController,
  BicycleParkingContainerCardEventRecordChartLineController,
  BicycleParkingContainerCardEventRecordChartPieController,
  BicycleParkingContainerCardEventRecordChartController,
  BicycleParkingContainerCardEventRecordController,

  BicycleParkingContainerCardController,

  BicycleParkingContainerStateController,
  BicycleParkingContainerMapController,
  BicycleParkingContainerVideoController,

  BicycleParkingContainerController,
];
export const garbageManagementContainerProviders = [...controllers];
