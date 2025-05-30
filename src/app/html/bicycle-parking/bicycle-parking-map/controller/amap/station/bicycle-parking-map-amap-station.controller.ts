import { EventEmitter } from '@angular/core';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { BicycleParkingMapAMapStationMarkerController } from './bicycle-parking-map-amap-station-marker.controller';
import { BicycleParkingMapAMapStationLabelInfo } from './label/bicycle-parking-map-amap-station-label-info.model';
import { BicycleParkingMapAMapStationLabelController } from './label/bicycle-parking-map-amap-station-label.controller';

export class BicycleParkingMapAMapStationController {
  dblclick = new EventEmitter<GarbageStation>();

  constructor(
    map: AMap.Map,
    private get: (
      stationId: string
    ) => Promise<BicycleParkingMapAMapStationLabelInfo>
  ) {
    this.label = new BicycleParkingMapAMapStationLabelController(map);
    this.layer = this.init(map);
  }

  private label: BicycleParkingMapAMapStationLabelController;
  private markers: BicycleParkingMapAMapStationMarkerController[] = [];
  private layer: AMap.LabelsLayer;

  // private regist(marker) {
  //   this.point.hover.subscribe((station) => {
  //     if (station.GisPoint) {
  //       this.label.open(station.Name, [
  //         station.GisPoint.Longitude,
  //         station.GisPoint.Latitude,
  //       ]);
  //     }
  //   });
  //   this.point.leave.subscribe(() => {
  //     this.label.close();
  //   });
  // }
  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zIndex: 121,
    });
    map.add(layer);
    return layer;
  }

  load(datas: GarbageStation[]) {
    let markers: AMap.LabelMarker[] = [];
    this.markers = datas.map((x) => {
      let marker = new BicycleParkingMapAMapStationMarkerController(x);
      marker.event.mouseover.subscribe((station) => {
        if (this.get) {
          this.get(station.Id).then((x) => {
            if (station.GisPoint) {
              this.label.open(x, [
                station.GisPoint.Longitude,
                station.GisPoint.Latitude,
              ]);
            }
          });
        }
      });
      marker.event.mouseout.subscribe(() => {
        this.label.close();
      });
      marker.event.dblclick.subscribe((data) => {
        this.dblclick.emit(data);
      });
      markers.push(marker.marker);
      return marker;
    });

    this.layer.add(markers);
  }
}
