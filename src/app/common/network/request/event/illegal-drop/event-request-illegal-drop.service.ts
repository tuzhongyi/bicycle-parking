import { instanceToPlain } from 'class-transformer';
import { IllegalDropEventRecord } from '../../../model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { EventUrl } from '../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetEventRecordIllegalDropParams } from './event-request-illegal-drop.params';

export class RecordsIllegalDropService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(IllegalDropEventRecord);
  }

  type: HowellBaseTypeRequestService<IllegalDropEventRecord>;

  list(
    params: GetEventRecordIllegalDropParams
  ): Promise<PagedList<IllegalDropEventRecord>> {
    let url = EventUrl.record.illegaldrop.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<IllegalDropEventRecord> {
    let url = EventUrl.record.illegaldrop.item(id);
    return this.type.get(url);
  }
}
