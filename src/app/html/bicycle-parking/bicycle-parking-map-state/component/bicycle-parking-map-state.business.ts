import { Injectable } from '@angular/core';
import { StationState } from '../../../../common/enum/station-state.enum';
import { GetGarbageStationsParams } from '../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage-station/garbage-station-request.service';
import { Flags } from '../../../../common/tools/flags';
import { BicycleParkingMapStateItem } from '../bicycle-parking-map-state-item/bicycle-parking-map-state-item.model';

@Injectable()
export class BicycleParkingMapStateBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async load(divisionId: string) {
    let datas = await this.data(divisionId);
    let count = datas.length;
    let normal = 0;
    let offline = 0;
    let alarm = 0;
    datas.forEach((x) => {
      let flags = new Flags(x.StationState);
      if (flags.contains(StationState.Error)) {
        offline++;
      } else if (flags.contains(StationState.Smoke)) {
        alarm++;
      }
    });
    normal = count - offline - alarm;
    return [
      this.convert.all(count),
      this.convert.normal(normal),
      this.convert.alarm(alarm),
      this.convert.offline(offline),
    ];
  }

  convert = {
    all: (value: number) => {
      let item = new BicycleParkingMapStateItem();
      item.name = '全部车棚';
      item.value = value;
      item.type = 'all';
    },
    normal: (value: number) => {
      let item = new BicycleParkingMapStateItem();
      item.name = '全部车棚';
      item.value = value;
      item.type = 'all';
    },
    alarm: (value: number) => {
      let item = new BicycleParkingMapStateItem();
      item.name = '全部车棚';
      item.value = value;
      item.type = 'all';
    },
    offline: (value: number) => {
      let item = new BicycleParkingMapStateItem();
      item.name = '全部车棚';
      item.value = value;
      item.type = 'all';
    },
  };

  data(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    return this.service.cache.all(params);
  }
}
