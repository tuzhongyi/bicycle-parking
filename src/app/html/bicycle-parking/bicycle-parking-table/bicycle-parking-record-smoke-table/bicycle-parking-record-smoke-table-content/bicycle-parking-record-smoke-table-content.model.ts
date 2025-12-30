import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { SmokeEventRecord } from '../../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

export class BicycleParkingRecordSmokeTableArgs {
  duration = DateTimeTool.last.month(new Date());
  name?: string;
  gridcell?: string;
  handled?: boolean;
}
export class BicycleParkingRecordSmokeTableItem extends SmokeEventRecord {
  County?: Promise<Division>;
  images: string[] = [];
}
