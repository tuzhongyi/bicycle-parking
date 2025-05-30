import { Injectable } from '@angular/core';
import { BicycleParkingContainerCardEventRecordChartController } from './bicycle-parking-container-card-event-record-chart.controller';
import { BicycleParkingContainerCardEventRecordListController } from './bicycle-parking-container-card-event-record-list.controller';

@Injectable()
export class BicycleParkingContainerCardEventRecordController {
  constructor(
    public list: BicycleParkingContainerCardEventRecordListController,
    public chart: BicycleParkingContainerCardEventRecordChartController
  ) {}
}
