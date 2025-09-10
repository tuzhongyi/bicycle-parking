import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';

@Injectable()
export class BicycleParkingContainerCardEventRecordListController {
  title = '本月预警记录';
  unit = TimeUnit.Month;
  constructor() {}
}
