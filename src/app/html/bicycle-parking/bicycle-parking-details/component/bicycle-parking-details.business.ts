import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class BicycleParkingDetailsBusiness {
  constructor(private service: GarbageStationRequestService) {}

  capture(stationId: string) {
    return this.service.manualCapture(stationId);
  }
}
