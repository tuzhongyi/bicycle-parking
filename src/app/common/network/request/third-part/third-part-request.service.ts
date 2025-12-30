import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { EventNumberStatistic } from '../../model/garbage-station/event-number-statistic.model';
import { EventRecord } from '../../model/garbage-station/event-record.model';
import { PagedList } from '../../model/page_list.model';
import { ThirdPartEventRecord } from '../../model/third-part/tpp-event-record.model';
import { TPPEventTypeDescriptor } from '../../model/third-part/tpp-event-type-descriptor.model';
import { ThirdPartUrl } from '../../url/third-part/third-part.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { AbstractService } from '../cache/cache.interface';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetTPEventNumbersParams,
  GetThirdPartEventsParams,
} from './third-part-request.params';

@Injectable({
  providedIn: 'root',
})
export class ThirdPartRequestService {
  constructor(private http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }

  private basic: HowellBaseRequestService;

  private _event?: ThirdPartEventRequestService;
  public get event(): ThirdPartEventRequestService {
    if (!this._event) {
      this._event = new ThirdPartEventRequestService(this.basic);
    }
    return this._event;
  }
}

class ThirdPartEventRequestService extends AbstractService<ThirdPartEventRecord> {
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.typeBasic = this.basic.type(ThirdPartEventRecord);
  }

  private typeBasic: HowellBaseTypeRequestService<ThirdPartEventRecord>;

  private _types: TPPEventTypeDescriptor[] = [];
  async types() {
    if (this._types.length > 0) {
      return this._types;
    }
    let url = ThirdPartUrl.event().types();
    let types = await this.basic.getArray(url, TPPEventTypeDescriptor);
    this._types = types;
    return this._types;
  }

  override get(id: string): Promise<ThirdPartEventRecord> {
    let url = ThirdPartUrl.event().item(id);
    return this.typeBasic.get(url);
  }

  override list(
    params: GetThirdPartEventsParams
  ): Promise<PagedList<ThirdPartEventRecord>> {
    let url = ThirdPartUrl.event().list();
    let plain = instanceToPlain(params);
    return this.typeBasic.paged(url, plain);
  }

  handle(id: string, data: FormData) {
    let url = ThirdPartUrl.event().handle(id);
    return this.basic.http.post<FormData, EventRecord>(url, data);
  }

  statistic = {
    numbers: (params: GetTPEventNumbersParams) => {
      let url = ThirdPartUrl.event().statistic.number();
      let plain = instanceToPlain(params);
      return this.basic.postArray<EventNumberStatistic>(
        url,
        EventNumberStatistic,
        plain
      );
    },
  };
}
