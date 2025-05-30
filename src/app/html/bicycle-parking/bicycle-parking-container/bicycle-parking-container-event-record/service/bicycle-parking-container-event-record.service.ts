import { Injectable } from '@angular/core';
import { EventRequestService } from '../../../../../common/network/request/event/event-request.service';
import { BicycleParkingContainerEventRecordSensorService } from './bicycle-parking-container-event-record-sensor.service';
import { BicycleParkingContainerEventRecordSmokeService } from './bicycle-parking-container-event-record-smoke.service';

@Injectable()
export class BicycleParkingContainerEventRecordService {
  constructor(service: EventRequestService) {
    this.smoke = new BicycleParkingContainerEventRecordSmokeService(service);
    this.sensor = new BicycleParkingContainerEventRecordSensorService(service);
  }

  smoke: BicycleParkingContainerEventRecordSmokeService;
  sensor: BicycleParkingContainerEventRecordSensorService;
}
