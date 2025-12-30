import { Injectable } from '@angular/core';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { EventNumber } from '../../../../../common/network/model/garbage-station/event-number.model';
import { GetTPEventNumbersParams } from '../../../../../common/network/request/third-part/third-part-request.params';
import { ThirdPartRequestService } from '../../../../../common/network/request/third-part/third-part-request.service';

@Injectable()
export class BicycleParkingContainerEventRecordThirdPartService {
  constructor(private service: ThirdPartRequestService) {}

  async load(divisionId: string, duration: Duration, types: number[]) {
    let params = new GetTPEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionId = divisionId;
    params.EventTypes = [...types];
    let numbers = await this.service.event.statistic.numbers(params);
    let items: EventNumber[] = [];
    for (let i = 0; i < numbers.length; i++) {
      const n = numbers[i];
      items = items.concat(n.EventNumbers);
    }
    return items;
  }

  types() {
    return this.service.event.types().catch((x) => {
      return [];
    });
  }
}
