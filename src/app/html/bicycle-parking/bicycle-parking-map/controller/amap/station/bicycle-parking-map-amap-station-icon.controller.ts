import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';

export class BicycleParkingMapAMapStationIconController {
  private size(): [number, number] {
    let width = 58;
    let height = 76;

    return [width * 0.7, height * 0.7];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: `image`,
      image: ``,
      size: this.size(),
      anchor: `bottom-center`,
    };
    return icon;
  }

  get normal() {
    return {
      default: {
        ...this.opts,
        image: PathTool.map.point.normal.default,
      },
      hover: {
        ...this.opts,
        image: PathTool.map.point.normal.hover,
      },
    };
  }
  get alarm() {
    return {
      default: {
        ...this.opts,
        image: PathTool.map.point.alarm.default,
      },
      hover: {
        ...this.opts,
        image: PathTool.map.point.alarm.hover,
      },
    };
  }
  get offline() {
    return {
      default: {
        ...this.opts,
        image: PathTool.map.point.offline.default,
      },
      hover: {
        ...this.opts,
        image: PathTool.map.point.offline.hover,
      },
    };
  }
}
