import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapConverter } from '../bicycle-parking-map-amap.converter';
import { BicycleParkingMapAMapRootBorderController } from './bicycle-parking-map-amap-root-border.controller';

export class BicycleParkingMapAMapRootController {
  border: BicycleParkingMapAMapRootBorderController;

  constructor(private loca: Loca.Container) {
    this.border = new BicycleParkingMapAMapRootBorderController(loca);
  }

  private converter = new BicycleParkingMapAMapConverter();

  load(data: MapDivision) {
    let geo = this.converter.geo.line.item(data);
    let source = new Loca.GeoJSONSource({ data: geo });
    this.border.load(source);
    this.loca.animate.start();
  }
}
