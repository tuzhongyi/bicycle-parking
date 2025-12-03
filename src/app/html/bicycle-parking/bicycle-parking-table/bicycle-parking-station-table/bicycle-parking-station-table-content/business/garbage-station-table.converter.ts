import { Injectable } from '@angular/core';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { MediumRequestService } from '../../../../../../common/network/model/medium/medium-request.service';
import { DivisionRequestService } from '../../../../../../common/network/request/division/division-request.service';
import { Flags } from '../../../../../../common/tools/flags';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Injectable()
export class GarbageStationTableConverter {
  constructor(
    division: DivisionRequestService,
    private medium: MediumRequestService
  ) {
    this.service = { division };
  }
  private service: {
    division: DivisionRequestService;
  };

  convert(data: GarbageStation) {
    let model = new GarbageStationTableModel();
    model.GarbageStation = data;
    this.item.states(data, model);
    this.item.urls(data, model);
    if (data.DivisionId) {
      model.Division = this.item.division(data.DivisionId).then((x) => {
        if (x.ParentId) {
          model.Parent = this.item.division(x.ParentId);
        }
        return x;
      });
    }
    return model;
  }

  private item = {
    division: (id: string) => {
      return this.service.division.cache.get(id);
    },
    states: (data: GarbageStation, model: GarbageStationTableModel) => {
      let flags = new Flags(data.StationState);
      model.states = flags.getValues();
      if (!model.states || model.states.length == 0) {
        model.states = [0];
      }
    },
    urls: (data: GarbageStation, model: GarbageStationTableModel) => {
      model.urls =
        data.Cameras?.map((x) =>
          x.ImageUrl ? this.medium.get(x.ImageUrl) : ''
        ) ?? [];
    },
  };
}
