import { StationState } from '../../../../../../common/enum/station-state.enum';
import { Division } from '../../../../../../common/network/model/garbage-station/division.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';

export class GarbageStationTableModel {
  GarbageStation!: GarbageStation;
  Division?: Promise<Division>;
  Parent?: Promise<Division>;
  states: StationState[] = [];
  urls: string[] = [];
}
export class GarbageStationTableArgs {
  stationId?: string;
  divisionId?: string;
  state?: number;
  stationName?: string;
  communityName?: string;
}
