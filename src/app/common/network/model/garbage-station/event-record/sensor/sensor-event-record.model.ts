import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { transformDateTime } from '../../../transform.model';
import { SensorValue } from '../../sensor/sensor-value.mdoel';
import { EventRecordData } from '../garbage-event-record.model';

/** 传感器超出阈值事件 */
export class SensorEventRecord extends EventRecordData<SensorEventData> {}
/** */
export class SensorEventData {
  /**	String	垃圾房ID	M	*/
  StationId!: string;
  /**	String	垃圾房名称	M	*/
  StationName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	Boolean	是否正在报警	O	*/
  IsAlarming?: boolean;
  /**	String	网格单元ID	O	*/
  GridCellId?: string;
  /**	String	网格单元名称	O	*/
  GridCellName?: string;
  /**	String	小区ID	O	*/
  CommunityId?: string;
  /**	String	小区名称	O	*/
  CommunityName?: string;
  /**	Int32	传感器类型	M	*/
  SensorType!: number;
  /**	0	1：充电桩，2：烟雾，3：喷淋压力	0	*/ 0: 0;
  /**	SensorValue[]	传感器数值	O	*/
  @Type(() => SensorValue)
  Values?: SensorValue[];
  /**	String	状态或故障	O	*/
  Status?: string;
  /**	String	状态或故障描述	O	*/
  StatusDescription?: string;
}
