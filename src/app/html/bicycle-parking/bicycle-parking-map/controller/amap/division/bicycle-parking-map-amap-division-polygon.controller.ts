import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapConfigController as Config } from '../bicycle-parking-map-amap.config';

export class BicycleParkingMapAMapDivisionPolygonController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PolygonLayer;
  private selected?: MapDivision;
  private handle?: NodeJS.Timeout;

  private style = {
    topColor: (index: number, feature: any) => {
      if (this.selected) {
        if (this.selected.id === feature.properties.id) {
          return Config.color.plain.selected;
        }
      }
      return Config.color.plain.division;
    },
    sideTopColor: Config.color.border.division,
    sideBottomColor: Config.color.border.division,
    height: Config.height,
    altitude: 0,
  };

  private init() {
    var layer = new Loca.PolygonLayer({
      zIndex: 120,
      opacity: 1,
      cullface: 'none',
      shininess: 1,
      hasSide: false,
      blockHide: false,
    });
    return layer;
  }

  private regist() {
    // BicycleParkingMapAMapConfigController.event.mousemoving.subscribe(
    //   (position) => {
    //     this.moving(position);
    //   }
    // );
  }

  private animation() {
    if (!this.handle) {
      this.handle = setInterval(() => {
        this.layer.setStyle(this.style);
      }, 1);
    }
  }

  private moving(position: [number, number]) {
    if (this.selected) {
      this.selected = undefined;
    }
    let item = this.layer.queryFeature(position);
    if (item) {
      this.selected = item.properties as MapDivision;
    }
  }

  select(data: MapDivision) {
    this.selected = data;
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    this.animation();
  }
}
