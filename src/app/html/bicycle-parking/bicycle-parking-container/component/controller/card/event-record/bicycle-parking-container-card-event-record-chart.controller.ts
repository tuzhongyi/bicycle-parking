import { Injectable } from '@angular/core';
import { BicycleParkingContainerCardEventRecordChartLineController } from './bicycle-parking-container-card-event-record-chart-line.controller';
import { BicycleParkingContainerCardEventRecordChartPieController } from './bicycle-parking-container-card-event-record-chart-pie.controller';

@Injectable()
export class BicycleParkingContainerCardEventRecordChartController {
  constructor(
    public line: BicycleParkingContainerCardEventRecordChartLineController,
    public pie: BicycleParkingContainerCardEventRecordChartPieController
  ) {}
}
