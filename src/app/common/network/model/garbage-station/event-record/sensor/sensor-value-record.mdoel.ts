import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../../../model.interface';
import { transformDateTime } from '../../../transform.model';
import { SensorValue } from './sensor-value.mdoel';

/**	SensorValueRecord (传感器数据记录信息)	*/
export class SensorValueRecord implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	String	传感器ID	M	*/
  SensorId!: string;
  /**	String	传感器名称	M	*/
  SensorName!: string;
  /**
   * Int32
   * 传感器类型
   * 1：充电桩，2：烟雾，3：喷淋压力
   * M
   **/
  SensorType!: number;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	垃圾房ID	O	*/
  StationId?: string;
  /**	String	垃圾房名称	O	*/
  StationName?: string;
  /**	String	小区ID	O	*/
  CommunityId?: string;
  /**	String	小区名称	O	*/
  CommunityName?: string;
  /**	SensorValue[]	传感器数值	M	*/
  @Type(() => SensorValue)
  Values!: SensorValue[];
  /**	DateTime	开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
}
