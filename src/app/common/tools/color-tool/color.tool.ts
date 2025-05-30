import { SensorType } from '../../enum/sensor/sensor-type.enum';

export class ColorTool {
  static warning = {
    smoker: '#f73d3d',
    spray: '#38baff',
    charger: '#ecec4c',
  };
  font = {};

  static get = {
    SensorType: (type: SensorType) => {
      switch (type) {
        case SensorType.Charger:
          return this.warning.charger;
        case SensorType.Smoker:
          return this.warning.smoker;
        case SensorType.Spayer:
          return this.warning.spray;

        default:
          return '#fff';
      }
    },
  };
}
