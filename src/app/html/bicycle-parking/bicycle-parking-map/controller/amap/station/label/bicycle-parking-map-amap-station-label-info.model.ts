import { Division } from '../../../../../../../common/network/model/garbage-station/division.model';
import { GarbageStationNumberStatistic } from '../../../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';

export class BicycleParkingMapAMapStationLabelInfo {
  station!: GarbageStation;
  statistic!: GarbageStationNumberStatistic;
  committees?: Division;
  county?: Division;
}
