import { StationState } from '../../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../../common/tools/flags';
import { BicycleParkingMapAMapStationIconController } from './bicycle-parking-map-amap-station-icon.controller';

import { EventEmitter } from '@angular/core';

export class BicycleParkingMapAMapStationMarkerEvent {
  mouseover = new EventEmitter<GarbageStation>();
  mouseout = new EventEmitter<GarbageStation>();
  click = new EventEmitter<GarbageStation>();
  dblclick = new EventEmitter<GarbageStation>();
}

export class BicycleParkingMapAMapStationMarkerController {
  event = new BicycleParkingMapAMapStationMarkerEvent();
  marker: AMap.LabelMarker;
  data: GarbageStation;

  constructor(data: GarbageStation) {
    this.marker = this.create(data);
    this.data = data;
  }

  private icon = new BicycleParkingMapAMapStationIconController();

  private create(data: GarbageStation) {
    if (data.GisPoint) {
      let position: [number, number] = [
        data.GisPoint.Longitude,
        data.GisPoint.Latitude,
      ];

      let flags = new Flags(data.StationState);
      let icon: any;
      if (flags.contains(StationState.Error)) {
        icon = this.icon.offline.default;
      } else {
        icon = this.icon.normal.default;
      }

      let marker = new AMap.LabelMarker({
        icon: icon,
        position: [...position],
        title: data.Name,
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      this.hover();
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.out();
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
    });
    marker.on('dblclick', (e: any) => {
      this.event.dblclick.emit(this.data);
    });
  }

  hover() {
    let icon: any;
    let flags = new Flags(this.data.StationState);
    if (flags.contains(StationState.Error)) {
      icon = this.icon.offline.hover;
    } else {
      icon = this.icon.normal.hover;
    }
    this.marker.setIcon(icon);
    let index = this.marker.getzIndex() ?? 0;
    this.marker.setzIndex(index + 2);
  }
  out() {
    let icon: any;
    let flags = new Flags(this.data.StationState);
    if (flags.contains(StationState.Error)) {
      icon = this.icon.offline.default;
    } else {
      icon = this.icon.normal.default;
    }
    this.marker.setIcon(icon);
    let index = this.marker.getzIndex() ?? 2;
    this.marker.setzIndex(index - 2);
  }
}
