import { SensorEventRecord } from '../../../model/garbage-station/event-record/sensor/sensor-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { EventUrl } from '../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetEventRecordsParams } from '../event-request.params';

export class RecordSensorService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(SensorEventRecord);
  }

  type: HowellBaseTypeRequestService<SensorEventRecord>;

  list(params: GetEventRecordsParams): Promise<PagedList<SensorEventRecord>> {
    let url = EventUrl.record.sensor.list();
    return this.type.paged(url, params);
  }

  async all(params: GetEventRecordsParams = new GetEventRecordsParams()) {
    let data: SensorEventRecord[] = [];
    let index = 1;
    let paged: PagedList<SensorEventRecord>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  get(id: string): Promise<SensorEventRecord> {
    let url = EventUrl.record.sensor.item(id);
    return this.type.get(url);
  }
}
