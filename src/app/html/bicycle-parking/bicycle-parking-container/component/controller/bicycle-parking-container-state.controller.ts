import { EventEmitter } from '@angular/core';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';

export class BicycleParkingContainerStateController {
  load = new EventEmitter<GarbageStation[]>();
  constructor(private that: BicycleParkingContainerComponent) {}
  on = {
    item: (state: StationState) => {
      this.that.window.station.table.state = state;
      this.that.window.station.table.show = true;
    },
  };
}
