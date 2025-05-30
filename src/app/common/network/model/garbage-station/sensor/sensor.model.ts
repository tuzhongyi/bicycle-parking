import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../model.interface';
import { transformDateTime } from '../../transform.model';
import { PlanLocation } from './plan-location.model';
import { SensorValue } from './sensor-value.mdoel';

/**	Sensor (传感器)	*/
export class Sensor implements IIdNameModel {
  /**	String	传感器ID	M	*/
  Id!: string;
  /**	String	传感器名称	M	*/
  Name!: string;
  /**	Int32	"传感器类型
1：充电桩，2：烟雾，3：喷淋压力"	M	*/
  SensorType!: number;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	String	垃圾房Id	M	*/
  GarbageStationId!: string;
  /**	String	传感器厂商	O	*/
  Vendor?: string;
  /**	SensorValue[]	传感器数值	O	*/
  Values?: SensorValue[];
  /**	Int32	在线状态0-正常，1-离线	O	*/
  OnlineStatus?: number;
  /**	String	状态或故障	O	*/
  Status?: string;
  /**	String	状态或故障描述	O	*/
  StatusDescription?: string;
  /**	Boolean	是否启用，默认：true	M	*/
  Enabled!: boolean;
  /**	PlanLocation	平面图位置	O	*/
  PlanLocation?: PlanLocation;
}
