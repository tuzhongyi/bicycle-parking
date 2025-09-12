import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { BicycleParkingMapAMapConfigController as Config } from '../bicycle-parking-map-amap.config';

export class BicycleParkingMapAMapCommunityPolygonController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PolygonLayer;

  private handle?: NodeJS.Timeout;

  private style = {
    topColor: Config.color.plain.selected,
    sideTopColor: Config.color.plain.community,
    sideBottomColor: Config.color.plain.community,
    height: Config.height + 1,
    altitude: 0,
  };

  private init() {
    var layer = new Loca.PolygonLayer({
      zIndex: 121,
      opacity: 1,
      shininess: 1,
      hasSide: true,
      blockHide: true,
      depth: true,
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

  select(data: MapDivision) {}

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    this.animation();
  }
}
