import { BicycleParkingContainerCardEventRecordChartLineController } from './bicycle-parking-container-card-event-record-chart-line.controller';
import { BicycleParkingContainerCardEventRecordChartPieController } from './bicycle-parking-container-card-event-record-chart-pie.controller';

export class BicycleParkingContainerCardEventRecordChartController {
  line: BicycleParkingContainerCardEventRecordChartLineController;
  pie: BicycleParkingContainerCardEventRecordChartPieController;
  constructor() {
    this.line = new BicycleParkingContainerCardEventRecordChartLineController();
    this.pie = new BicycleParkingContainerCardEventRecordChartPieController();
  }
}
