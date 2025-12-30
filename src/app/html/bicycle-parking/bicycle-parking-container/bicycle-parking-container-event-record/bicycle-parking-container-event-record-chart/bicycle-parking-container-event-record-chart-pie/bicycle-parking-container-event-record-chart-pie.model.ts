import { KeyValue } from '@angular/common';

export class BicycleParkingContainerEventRecordChartPieModel {
  smoker = 0;
  spray = 0;
  charger = 0;
  thirdpart: KeyValue<number, number>[] = [];
}

export interface BicycleParkingContainerEventRecordChartPieItem<TId = number> {
  id: TId;
  color: string;
  name: string;
  value: number;
}
