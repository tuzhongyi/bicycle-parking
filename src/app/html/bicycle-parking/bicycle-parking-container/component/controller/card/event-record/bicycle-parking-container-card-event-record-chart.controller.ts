import { BicycleParkingContainerComponent } from '../../../bicycle-parking-container.component';
import { BicycleParkingContainerCardEventRecordChartLineController } from './bicycle-parking-container-card-event-record-chart-line.controller';
import { BicycleParkingContainerCardEventRecordChartPieController } from './bicycle-parking-container-card-event-record-chart-pie.controller';

export class BicycleParkingContainerCardEventRecordChartController {
  line: BicycleParkingContainerCardEventRecordChartLineController;
  pie: BicycleParkingContainerCardEventRecordChartPieController;
  constructor(that: BicycleParkingContainerComponent) {
    this.line = new BicycleParkingContainerCardEventRecordChartLineController();
    this.pie = new BicycleParkingContainerCardEventRecordChartPieController(
      that
    );
  }
}
