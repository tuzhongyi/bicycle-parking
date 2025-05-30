export class PathToolMap {
  constructor(private node: string) {}

  get point() {
    return new MapPoint(this.node);
  }

  get alarm() {
    return `${this.node}/assets/image/map/alarm_red.png`;
  }
}

class MapPoint {
  constructor(private node: string) {}
  get normal() {
    return {
      default: `${this.node}/assets/image/map/parking-normal.png`,
      hover: `${this.node}/assets/image/map/parking-normal-over.png`,
    };
  }
  get alarm() {
    return {
      default: `${this.node}/assets/image/map/parking-alarm.png`,
      hover: `${this.node}/assets/image/map/parking-alarm-over.png`,
    };
  }
  get offline() {
    return {
      default: `${this.node}/assets/image/map/parking-offline.png`,
      hover: `${this.node}/assets/image/map/parking-offline-over.png`,
    };
  }
}
