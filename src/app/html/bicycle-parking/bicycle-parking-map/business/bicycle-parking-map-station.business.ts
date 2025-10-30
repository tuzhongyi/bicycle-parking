import { Injectable } from '@angular/core';
import { StationState } from '../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from '../../../../common/network/request/division/division-request.service';
import {
  GarbageStationResetStateParams,
  GetGarbageStationsParams,
} from '../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { Flags } from '../../../../common/tools/flags';
import { BicycleParkingMapAMapStationLabelInfo } from '../controller/amap/station/label/bicycle-parking-map-amap-station-label-info.model';

@Injectable()
export class BicycleParkingMapStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private division: DivisionRequestService,
    private global: GlobalStorageService
  ) {}
  async load() {
    let division = await this.global.division.selected;
    let params = new GetGarbageStationsParams();
    params.AncestorId = division.Id;
    let stations = await this.service.all(params);

    return stations;
  }

  async info(stationId: string) {
    let info = new BicycleParkingMapAMapStationLabelInfo();
    info.station = await this.service.get(stationId);
    info.statistic = await this.service.statistic.number.get(stationId);
    if (info.station.DivisionId) {
      info.committees = await this.division.cache.get(info.station.DivisionId);
      if (info.committees.ParentId) {
        info.county = await this.division.cache.get(info.committees.ParentId);
      }
    }
    return info;
  }

  async reset(station: GarbageStation) {
    let params = new GarbageStationResetStateParams();
    let flags: Flags<StationState>;
    if (typeof station.StationState === 'number') {
      flags = new Flags<StationState>(station.StationState);
    } else {
      flags = station.StationState;
    }
    let values = [];
    if (flags.contains(StationState.Error)) {
      values.push(StationState.Error);
    }
    if (flags.contains(StationState.Full)) {
      values.push(StationState.Full);
    }
    if (flags.contains(StationState.PanicButton)) {
      values.push(StationState.PanicButton);
    }
    params.State = Flags.parse(values);

    let result = await this.service.resetState(station.Id, params);
    return result === 0;
  }
}
