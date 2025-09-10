import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';

@Injectable()
export class BicycleParkingContainerCardTaskController {
  title = '本月派单处置';
  unit = TimeUnit.Month;
  constructor() {}
}
