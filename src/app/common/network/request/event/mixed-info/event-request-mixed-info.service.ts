import { MixedIntoEventRecord } from '../../../model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { EventUrl } from '../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetEventRecordMixedIntoParams } from './event-request-mixed-info.params';

export class RecordsMixedIntoService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(MixedIntoEventRecord);
  }

  type: HowellBaseTypeRequestService<MixedIntoEventRecord>;

  list(
    params: GetEventRecordMixedIntoParams
  ): Promise<PagedList<MixedIntoEventRecord>> {
    let url = EventUrl.record.mixedinto.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<MixedIntoEventRecord> {
    let url = EventUrl.record.mixedinto.item(id);
    return this.type.get(url);
  }
}
