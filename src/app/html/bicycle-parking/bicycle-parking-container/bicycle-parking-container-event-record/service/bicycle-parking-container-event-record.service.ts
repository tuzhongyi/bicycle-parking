import { Injectable } from '@angular/core';
import { EventRequestService } from '../../../../../common/network/request/event/event-request.service';
import { ThirdPartRequestService } from '../../../../../common/network/request/third-part/third-part-request.service';
import { BicycleParkingContainerEventRecordSensorService } from './bicycle-parking-container-event-record-sensor.service';
import { BicycleParkingContainerEventRecordSmokeService } from './bicycle-parking-container-event-record-smoke.service';
import { BicycleParkingContainerEventRecordThirdPartService } from './bicycle-parking-container-event-record-thirdpart.service';

@Injectable()
export class BicycleParkingContainerEventRecordService {
  constructor(
    service: EventRequestService,
    thirdpart: ThirdPartRequestService
  ) {
    this.smoke = new BicycleParkingContainerEventRecordSmokeService(service);
    this.sensor = new BicycleParkingContainerEventRecordSensorService(service);
    this.thirdpart = new BicycleParkingContainerEventRecordThirdPartService(
      thirdpart
    );
  }

  smoke: BicycleParkingContainerEventRecordSmokeService;
  sensor: BicycleParkingContainerEventRecordSensorService;
  thirdpart: BicycleParkingContainerEventRecordThirdPartService;
}
