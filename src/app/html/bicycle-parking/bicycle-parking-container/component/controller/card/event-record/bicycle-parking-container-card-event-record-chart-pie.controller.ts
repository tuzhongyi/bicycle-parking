import { SensorType } from '../../../../../../../common/enum/sensor/sensor-type.enum';
import { BicycleParkingRecordThirdPartTableArgs } from '../../../../../bicycle-parking-table/bicycle-parking-record-thirdpart-table/bicycle-parking-record-thirdpart-table-content/bicycle-parking-record-thirdpart-table-content.model';
import { BicycleParkingContainerComponent } from '../../../bicycle-parking-container.component';

export class BicycleParkingContainerCardEventRecordChartPieController {
  title = '本月预警占比';
  constructor(private that: BicycleParkingContainerComponent) {}

  on = {
    smoke: () => {
      this.that.window.event.smoke.show = true;
    },
    sensor: (type: SensorType) => {
      this.that.window.event.sensor.show = true;
    },
    thirdpart: (type: number) => {
      this.that.window.event.thirdpart.args =
        new BicycleParkingRecordThirdPartTableArgs();
      this.that.window.event.thirdpart.args.type = type;
      this.that.window.event.thirdpart.show = true;
    },
  };
}
