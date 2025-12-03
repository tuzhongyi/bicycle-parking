import { Injectable } from '@angular/core';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { GetCommunitiesParams } from '../../../../common/network/request/community/community-request.params';
import { CommunityRequestService } from '../../../../common/network/request/community/community-request.service';
import { GetDivisionsParams } from '../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/division/division-request.service';
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
  }

  private service: {
    map: MapRequestService;
    division: DivisionRequestService;
    community: CommunityRequestService;
  };

  private default = new PromiseValue<IDivision>();

  async root() {
    let division = await this.global.division.default;
    return this.service.map.division.get(division.Id);
  }

  async divisions() {
    let root = await this.global.division.default;
    let divisions = await this.load.division(root.Id);
    return this.service.map.division.array(divisions.map((x) => x.Id));
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
