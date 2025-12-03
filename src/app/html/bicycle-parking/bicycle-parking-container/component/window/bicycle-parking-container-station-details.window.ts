import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';

export class BicycleParkingContainerStationDetailsWindow extends WindowViewModel {
  constructor() {
    super();

    if (screen.width / screen.height < 2) {
      this.style.width = '85%';
    }
  }
  style: any = {};
  data?: GarbageStation;
  title = '';
}
