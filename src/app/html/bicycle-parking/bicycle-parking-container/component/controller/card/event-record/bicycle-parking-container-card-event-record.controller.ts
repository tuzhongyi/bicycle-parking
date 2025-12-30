import { BicycleParkingContainerComponent } from '../../../bicycle-parking-container.component';
import { BicycleParkingContainerCardEventRecordChartController } from './bicycle-parking-container-card-event-record-chart.controller';
import { BicycleParkingContainerCardEventRecordListController } from './bicycle-parking-container-card-event-record-list.controller';

export class BicycleParkingContainerCardEventRecordController {
  list: BicycleParkingContainerCardEventRecordListController;
  chart: BicycleParkingContainerCardEventRecordChartController;
  constructor(that: BicycleParkingContainerComponent) {
    this.list = new BicycleParkingContainerCardEventRecordListController();
    this.chart = new BicycleParkingContainerCardEventRecordChartController(
      that
    );
  }
}
