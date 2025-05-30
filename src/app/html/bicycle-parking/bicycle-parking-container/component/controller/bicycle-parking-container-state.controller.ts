import { EventEmitter, Injectable } from '@angular/core';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';

@Injectable()
export class BicycleParkingContainerStateController {
  load = new EventEmitter<GarbageStation[]>();
}
