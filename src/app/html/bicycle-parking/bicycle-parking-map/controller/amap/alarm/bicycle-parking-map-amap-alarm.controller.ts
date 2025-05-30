import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';

export class BicycleParkingMapAMapAlarmController {
  constructor(private loca: Loca.Container) {}

  private _scatter?: Loca.ScatterLayer;
  get scatter() {
    if (!this._scatter) {
      this._scatter = new Loca.ScatterLayer({
        opacity: 1,
        visible: true,
      });
    }
    return this._scatter;
  }

  load(datas: GarbageStation[]) {
    let geo = this.convert(datas);

    this.scatter.setSource(geo);
    this.scatter.setStyle({
      unit: 'px',
      size: [100, 100],
      borderWidth: 0,
      texture: PathTool.map.alarm,
      duration: 500,
      animate: true,
    });

    this.loca.add(this.scatter);
    this.loca.animate.start();
  }

  clear() {
    if (this._scatter) {
      this.loca.remove(this.scatter);
      this._scatter = undefined;
    }
  }

  private convert(datas: GarbageStation[]) {
    let geo: any = {
      type: 'FeatureCollection',
      features: datas
        .filter((x) => !!x.GisPoint)
        .map((x) => {
          let point = x.GisPoint!;
          let data = {
            type: 'Feature',
            properties: x,
            geometry: {
              type: 'Point',
              coordinates: [point.Longitude, point.Latitude],
            },
          };
          return data;
        }),
    };
    return new Loca.GeoJSONSource({ data: geo });
  }
}
