import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapConverter } from '../bicycle-parking-map-amap.converter';
import { BicycleParkingMapAMapCommunityPolygonController } from './bicycle-parking-map-amap-community-polygon.controller';

export class BicycleParkingMapAMapCommunityController {
  constructor(loca: Loca.Container) {
    this.polygon = new BicycleParkingMapAMapCommunityPolygonController(loca);
  }

  private converter = new BicycleParkingMapAMapConverter();
  private polygon: BicycleParkingMapAMapCommunityPolygonController;

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
  }

  select(data: MapDivision) {
    this.polygon.select(data);
  }
}
