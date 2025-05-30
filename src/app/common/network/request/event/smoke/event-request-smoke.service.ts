import { SmokeEventRecord } from '../../../model/garbage-station/event-record/smoke/smoke-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { EventUrl } from '../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetEventRecordsParams } from '../event-request.params';

export class RecordSmokeService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(SmokeEventRecord);
  }

  type: HowellBaseTypeRequestService<SmokeEventRecord>;

  list(params: GetEventRecordsParams): Promise<PagedList<SmokeEventRecord>> {
    let url = EventUrl.record.smoke.list();
    return this.type.paged(url, params);
  }

  async all(params: GetEventRecordsParams = new GetEventRecordsParams()) {
    let data: SmokeEventRecord[] = [];
    let index = 1;
    let paged: PagedList<SmokeEventRecord>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  get(id: string): Promise<SmokeEventRecord> {
    let url = EventUrl.record.smoke.item(id);
    return this.type.get(url);
  }
}
