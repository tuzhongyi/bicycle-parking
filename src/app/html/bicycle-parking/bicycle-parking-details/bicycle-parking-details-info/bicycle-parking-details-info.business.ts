import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class BicycleParkingDetailsInfoBusiness {
  constructor(private service: GarbageStationRequestService) {}

  sensor(stationId: string) {
    return this.service.sensor.array(stationId);
  }
}
