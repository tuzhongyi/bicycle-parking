import { Transform, Type } from 'class-transformer';
import { GisPoint } from '../garbage-station/gis-point.model';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { Assignment } from './assignment.model';
import { EventResourceContent } from './event-resource-content.model';

/**	TPPEventRecord (事件记录)	*/
export class ThirdPartEventRecord implements IIdModel {
  /**	String	事件记录唯一ID，服务器端分配，创建时使用空字符串“”	M	*/
  Id!: string;
  /**	String	事件全部唯一ID	M	*/
  Guid!: string;
  /**	String	设备ID，设备序列号。	M	*/
  DeviceId!: string;
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	BASE64	扩展数据	O	*/
  ExtensionData?: string;
  /**	EventResourceContent[]	报警事件资源列表	O	*/
  @Type(() => EventResourceContent)
  Resources?: EventResourceContent[];
  /**	Assignment	派单和处置信息	O	*/
  @Type(() => Assignment)
  Assignment?: Assignment;
  /**	GisPoint	Gis坐标	O	*/
  Location?: GisPoint;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	地址	O	*/
  Address?: string;
  /**	Boolean	是否已确认	O	*/
  Confirmed?: boolean;
  /**	DateTime	确认时间	O	*/
  @Transform(transformDateTime)
  ConfirmedTime?: Date;
  /**	Double	置信度，0-100	O	*/
  Confidence?: number;
  /**	String	网格ID	O	*/
  GridCellId?: string;
}
