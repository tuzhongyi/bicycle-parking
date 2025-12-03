import { Injectable } from '@angular/core';
import { BicycleParkingContainerCardDeviceController } from './bicycle-parking-container-card-device.controller';
import { BicycleParkingContainerCardDivisionController } from './bicycle-parking-container-card-division.controller';
import { BicycleParkingContainerCardTaskController } from './bicycle-parking-container-card-task.controller';
import { BicycleParkingContainerCardEventRecordController } from './event-record/bicycle-parking-container-card-event-record.controller';

@Injectable()
export class BicycleParkingContainerCardController {
  division: BicycleParkingContainerCardDivisionController;
  device: BicycleParkingContainerCardDeviceController;
  task: BicycleParkingContainerCardTaskController;
  event: {
    record: BicycleParkingContainerCardEventRecordController;
  };
  constructor() {
    this.division = new BicycleParkingContainerCardDivisionController();
    this.device = new BicycleParkingContainerCardDeviceController();
    this.task = new BicycleParkingContainerCardTaskController();
    this.event = {
      record: new BicycleParkingContainerCardEventRecordController(),
    };
  }
}
