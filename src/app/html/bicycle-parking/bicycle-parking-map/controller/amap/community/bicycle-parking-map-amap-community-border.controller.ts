import { BicycleParkingMapAMapConfigController as Config } from '../bicycle-parking-map-amap.config';

export class BicycleParkingMapAMapDivisionBorderController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.LineLayer;
  private style = {
    color: Config.color.border.division,
    borderColor: Config.color.border.division,
    borderWidth: 0,
    lineWidth: 2,
    altitude: Config.height,
  };

  private init() {
    var layer = new Loca.LineLayer({});
    return layer;
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
  }
}
