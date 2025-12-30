import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { BicycleParkingContainerComponent } from '../../bicycle-parking-container.component';

export class BicycleParkingContainerCardTaskController {
  title = '本月派单处置';
  unit = TimeUnit.Month;
  constructor(private that: BicycleParkingContainerComponent) {}

  on = {
    item: (handled?: boolean) => {
      this.that.window.event.smoke.show = true;
    },
  };
}
