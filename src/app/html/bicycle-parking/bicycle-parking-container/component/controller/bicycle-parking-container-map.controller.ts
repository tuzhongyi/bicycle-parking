import { EventEmitter } from '@angular/core';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';

export class BicycleParkingContainerMapController {
  load = new EventEmitter<void>();
  select = new EventEmitter<GarbageStation>();

  constructor(private that: BicycleParkingContainerComponent) {}

  private get state() {
    return this.that.state;
  }

  onloaded(datas: GarbageStation[]) {
    this.state.load.emit(datas);
  }
}
