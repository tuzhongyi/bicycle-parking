import { EventEmitter, Injectable } from '@angular/core';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapController } from './amap/bicycle-parking-map-amap.controller';
import { BicycleParkingMapAMapStationLabelInfo } from './amap/station/label/bicycle-parking-map-amap-station-label-info.model';

@Injectable()
export class BicycleParkingMapController {
  event = {
    dblclick: new EventEmitter<GarbageStation>(),
  };

  constructor(private amap: BicycleParkingMapAMapController) {
    this._regist(amap);
  }

  private _regist(amap: BicycleParkingMapAMapController) {
    amap.event.dblclick.subscribe((station) => {
      this.event.dblclick.emit(station);
    });
  }

  move(center: [number, number]) {
    this.amap.move(center);
  }

  fit() {
    this.amap.fit();
  }

  load = {
    root: (data: MapDivision) => {
      this.amap.root.get().then((x) => {
        x.load(data);
      });
    },
    division: (datas: MapDivision[]) => {
      this.amap.division.get().then((x) => {
        x.load(datas);
      });
    },
    station: (datas: GarbageStation[]) => {
      this.amap.station.get().then((x) => {
        x.load(datas);
      });
    },
    community: (datas: MapDivision[]) => {
      this.amap.community.get().then((x) => {
        x.load(datas);
      });
    },
  };

  alarm = {
    start: (datas: GarbageStation[]) => {
      this.amap.alarm.get().then((x) => {
        x.load(datas);
      });
    },
    stop: () => {
      this.amap.alarm.get().then((x) => {
        x.clear();
      });
    },
  };

  select(data: MapDivision) {
    this.amap.division.get().then((x) => {
      x.select(data);
    });
  }

  regist(
    get: (stationId: string) => Promise<BicycleParkingMapAMapStationLabelInfo>
  ) {
    this.amap.get.set(get);
  }
}
