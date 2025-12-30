import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { SensorEventRecord } from '../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

export class BicycleParkingRecordSensorTableArgs {
  duration = DateTimeTool.last.month(new Date());
  name?: string;
  gridcell?: string;
  handled?: boolean;
}
export class BicycleParkingRecordSensorTableItem extends SensorEventRecord {
  County?: Promise<Division>;
  images: string[] = [];
}
