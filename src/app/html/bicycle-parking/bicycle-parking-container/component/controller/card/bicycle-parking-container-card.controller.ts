import { Injectable } from '@angular/core';
import { BicycleParkingContainerCardDeviceController } from './bicycle-parking-container-card-device.controller';
import { BicycleParkingContainerCardDivisionController } from './bicycle-parking-container-card-division.controller';
import { BicycleParkingContainerCardTaskController } from './bicycle-parking-container-card-task.controller';
import { BicycleParkingContainerCardEventRecordController } from './event-record/bicycle-parking-container-card-event-record.controller';

@Injectable()
export class BicycleParkingContainerCardController {
  event: {
    record: BicycleParkingContainerCardEventRecordController;
  };
  constructor(
    public division: BicycleParkingContainerCardDivisionController,
    public device: BicycleParkingContainerCardDeviceController,
    public task: BicycleParkingContainerCardTaskController,
    record: BicycleParkingContainerCardEventRecordController
  ) {
    this.event = { record };
  }
}
