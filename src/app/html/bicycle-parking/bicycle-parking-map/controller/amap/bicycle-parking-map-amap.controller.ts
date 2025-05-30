import { EventEmitter, Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { MapDivision } from '../../../../../common/network/request/map/map-division.model';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { BicycleParkingMapAMapAlarmController } from './alarm/bicycle-parking-map-amap-alarm.controller';
import { BicycleParkingMapAMapConfigController } from './bicycle-parking-map-amap.config';
import { BicycleParkingMapAMapDivisionController } from './division/bicycle-parking-map-amap-division.controller';
import { BicycleParkingMapAMapRootController } from './root/bicycle-parking-map-amap-root.controller';
import { BicycleParkingMapAMapStationController } from './station/bicycle-parking-map-amap-station.controller';
import { BicycleParkingMapAMapStationLabelInfo } from './station/label/bicycle-parking-map-amap-station-label-info.model';

@Injectable()
export class BicycleParkingMapAMapController {
  root = new PromiseValue<BicycleParkingMapAMapRootController>();
  division = new PromiseValue<BicycleParkingMapAMapDivisionController>();
  station = new PromiseValue<BicycleParkingMapAMapStationController>();
  alarm = new PromiseValue<BicycleParkingMapAMapAlarmController>();
  get = new PromiseValue<
    (stationId: string) => Promise<BicycleParkingMapAMapStationLabelInfo>
  >();
  event = {
    dblclick: new EventEmitter<GarbageStation>(),
  };
  constructor() {
    MapHelper.amap
      .get('map-container', { showBuildingBlock: false, showLabel: false })
      .then((map) => {
        this.map.set(map);
        this.regist.map(map);

        let container = new Loca.Container({ map });
        this.loca.set(container);

        let alarm = new BicycleParkingMapAMapAlarmController(container);
        this.alarm.set(alarm);

        let root = new BicycleParkingMapAMapRootController(container);
        this.root.set(root);

        let division = new BicycleParkingMapAMapDivisionController(container);
        this.division.set(division);

        this.get.get().then((get) => {
          let station = new BicycleParkingMapAMapStationController(map, get);
          this.regist.station(station);
          this.station.set(station);
        });
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e) => {
        let position = e.pixel.toArray();
        BicycleParkingMapAMapConfigController.event.mousemoving.emit(position);
      });
    },
    station: (controller: BicycleParkingMapAMapStationController) => {
      controller.dblclick.subscribe((station) => {
        this.event.dblclick.emit(station);
      });
    },
  };

  move(position: [number, number]) {
    this.map.get().then((x) => {
      x.setCenter(position);
    });
  }
  fit() {
    this.map.get().then((x) => {
      x.setFitView();
    });
  }
  select(data: MapDivision) {
    this.division.get().then((x) => {
      x.select(data);
    });
  }
}
