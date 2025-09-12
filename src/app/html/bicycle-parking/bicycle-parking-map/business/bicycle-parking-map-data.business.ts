import { Injectable } from '@angular/core';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { GetCommunitiesParams } from '../../../../common/network/request/community/community-request.params';
import { CommunityRequestService } from '../../../../common/network/request/community/community-request.service';
import { GetDivisionsParams } from '../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/division/division-request.service';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { MapRequestService } from '../../../../common/network/request/map/map-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { PromiseValue } from '../../../../common/view-models/value.promise';

@Injectable()
export class BicycleParkingMapDataBusiness {
  constructor(
    map: MapRequestService,
    private global: GlobalStorageService,
    division: DivisionRequestService,
    community: CommunityRequestService
  ) {
    this.service = { map, division, community };
    this.init.load();
  }

  private service: {
    map: MapRequestService;
    division: DivisionRequestService;
    community: CommunityRequestService;
  };

  data = {
    root: new PromiseValue<MapDivision>(),
    division: new PromiseValue<MapDivision[]>(),
    community: new PromiseValue<MapDivision[]>(),
  };

  private default = new PromiseValue<IDivision>();

  private init = {
    load: () => {
      this.init.default();
      this.init.division();
      this.init.community();
    },
    default: () => {
      this.global.division.default.then((division) => {
        this.default.set(division);
        this.service.map.division.get(division.Id).then((x) => {
          this.data.root.set(x);
        });
      });
    },
    division: async () => {
      let root = await this.default.get();
      let divisions = await this.load.division(root.Id);
      let datas = await this.service.map.division.array(
        divisions.map((x) => x.Id)
      );
      this.data.division.set(datas);
    },
    community: async () => {
      let divisions = await this.load.community();
      let datas = await this.service.map.division.array(
        divisions.map((x) => x.Id)
      );
      this.data.community.set(datas);
    },
  };

  private conditions<T1, T2>(
    array1: T1[],
    array2: T2[],
    condition: (a: T1, b: T2) => boolean
  ): T1[] {
    const result: T1[] = [];
    for (const item1 of array1) {
      for (const item2 of array2) {
        if (condition(item1, item2)) {
          result.push(item1);
          break;
        }
      }
    }
    return result;
  }

  private load = {
    division: (divisionId: string) => {
      let params = new GetDivisionsParams();
      params.AncestorId = divisionId;
      return this.service.division.cache.all(params);
    },
    community: () => {
      let params = new GetCommunitiesParams();
      return this.service.community.all(params);
    },
  };
}
