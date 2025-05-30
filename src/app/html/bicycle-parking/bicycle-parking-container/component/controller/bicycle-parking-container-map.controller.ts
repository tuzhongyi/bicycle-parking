import { Injectable } from '@angular/core';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { BicycleParkingContainerStateController } from './bicycle-parking-container-state.controller';

@Injectable()
export class BicycleParkingContainerMapController {
  constructor(private state: BicycleParkingContainerStateController) {}

  onloaded(datas: GarbageStation[]) {
    this.state.load.emit(datas);
  }
}
