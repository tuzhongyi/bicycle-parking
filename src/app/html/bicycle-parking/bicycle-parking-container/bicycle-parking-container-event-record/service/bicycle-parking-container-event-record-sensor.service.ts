import { Injectable } from '@angular/core';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { GetEventRecordsParams } from '../../../../../common/network/request/event/event-request.params';
import { EventRequestService } from '../../../../../common/network/request/event/event-request.service';

@Injectable()
export class BicycleParkingContainerEventRecordSensorService {
  constructor(private service: EventRequestService) {}

  async load(divisionId: string, duration: Duration) {
    let params = new GetEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [divisionId];
    return this.service.record.sensor.all(params);
  }
}
