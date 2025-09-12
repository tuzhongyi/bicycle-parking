import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../../model/garbage-station/community/community.model';
import { PagedList } from '../../model/page_list.model';
import { CommunityUrl } from '../../url/community/community.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { Cache } from '../cache/cache';
import { AbstractService } from '../cache/cache.interface';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetCommunitiesParams } from './community-request.params';

@Cache(CommunityUrl.basic(), Community)
@Injectable({
  providedIn: 'root',
})
export class CommunityRequestService extends AbstractService<Community> {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Community>;

  constructor(http: HowellAuthHttpService, router: Router) {
    super();
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Community);
  }

  create(data: Community): Promise<Community> {
    let url = CommunityUrl.basic();
    return this.type.post(url, data);
  }
  get(id: string): Promise<Community> {
    let url = CommunityUrl.item(id);
    return this.type.get(url);
  }
  update(data: Community): Promise<Community> {
    let url = CommunityUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string): Promise<Community> {
    let url = CommunityUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetCommunitiesParams = new GetCommunitiesParams()
  ): Promise<PagedList<Community>> {
    let url = CommunityUrl.list();
    return this.type.paged(url, params);
  }
}
