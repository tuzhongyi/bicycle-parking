import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapConverter } from '../bicycle-parking-map-amap.converter';
import { BicycleParkingMapAMapDivisionBorderController } from './bicycle-parking-map-amap-division-border.controller';
import { BicycleParkingMapAMapDivisionPolygonController } from './bicycle-parking-map-amap-division-polygon.controller';

export class BicycleParkingMapAMapDivisionController {
  constructor(private loca: Loca.Container) {
    this.polygon = new BicycleParkingMapAMapDivisionPolygonController(loca);
    this.border = new BicycleParkingMapAMapDivisionBorderController(loca);
  }

  // items: BicycleParkingMapAMapDivisionItemController[] = [];

  private converter = new BicycleParkingMapAMapConverter();
  private polygon: BicycleParkingMapAMapDivisionPolygonController;
  private border: BicycleParkingMapAMapDivisionBorderController;

  load(datas: MapDivision[]) {
    let geo = {
      line: this.converter.geo.line.array(datas),
      polygon: this.converter.geo.polygon.array(datas),
    };

    let source = {
      line: new Loca.GeoJSONSource({ data: geo.line }),
      polygon: new Loca.GeoJSONSource({ data: geo.polygon }),
    };
    this.polygon.load(source.polygon);
    this.border.load(source.line);
  }

  select(data: MapDivision) {
    this.polygon.select(data);
  }
}
