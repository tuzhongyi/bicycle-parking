import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { ThirdPartRequestService } from '../../../../../common/network/request/third-part/third-part-request.service';

@Injectable()
export class BicycleParkingRecordThirdPartTableManagerSource {
  types: KeyValue<number, string>[] = [];

  constructor(private service: ThirdPartRequestService) {
    this.init.types();
  }

  private init = {
    types: async () => {
      let types = await this.service.event.types();
      this.types = types.map((x) => {
        return { key: x.EventType, value: x.EventName };
      });
    },
  };
}
