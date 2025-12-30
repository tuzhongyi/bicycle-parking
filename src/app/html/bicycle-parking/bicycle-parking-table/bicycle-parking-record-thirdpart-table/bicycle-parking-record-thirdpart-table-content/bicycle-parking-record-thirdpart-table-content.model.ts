import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { ThirdPartEventRecord } from '../../../../../common/network/model/third-part/tpp-event-record.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

export class BicycleParkingRecordThirdPartTableArgs {
  duration = DateTimeTool.last.month(new Date());
  gridcell?: string;
  handled?: boolean;
  type?: number;
}
export class BicycleParkingRecordThirdPartTableItem extends ThirdPartEventRecord {
  Division?: Promise<Division>;
  images: string[] = [];
  EventName!: Promise<string>;
}
