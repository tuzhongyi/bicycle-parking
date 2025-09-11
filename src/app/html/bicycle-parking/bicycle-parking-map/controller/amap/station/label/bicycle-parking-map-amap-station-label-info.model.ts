import { Division } from '../../../../../../../common/network/model/garbage-station/division.model';
import { GarbageStationNumberStatistic } from '../../../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Member } from '../../../../../../../common/network/model/garbage-station/member.model';

export class BicycleParkingMapAMapStationLabelInfo {
  station!: GarbageStation;
  statistic!: GarbageStationNumberStatistic;
  committees?: Division;
  county?: Division;
  community?: string;
  get member(): Member | undefined {
    if (this.station.Members && this.station.Members.length > 0) {
      return this.station.Members[0];
    }
    return undefined;
  }
}
