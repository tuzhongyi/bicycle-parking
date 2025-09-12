import { Injectable } from '@angular/core';
import { GetCommunitiesParams } from '../../../../common/network/request/community/community-request.params';
import { CommunityRequestService } from '../../../../common/network/request/community/community-request.service';

@Injectable()
export class BicycleParkingMapCommunityBusiness {
  constructor(private service: CommunityRequestService) {}

  load(divisionId: string) {
    let params = new GetCommunitiesParams();
    params.DivisionId = divisionId;
    return this.service.all(params);
  }
}
