import { Injectable } from '@angular/core';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { IIdNameModel } from '../../../../../common/network/model/model.interface';

@Injectable()
export class BicycleParkingStationTableManagerSource {
  states: IIdNameModel<number>[];

  constructor() {
    this.states = this.init.state();
  }

  init = {
    state: () => {
      return [
        { Id: StationState.Normal, Name: '正常' },
        { Id: StationState.Error, Name: '离线' },
        { Id: StationState.Smoke, Name: '火灾报警' },
      ];
    },
  };
}
