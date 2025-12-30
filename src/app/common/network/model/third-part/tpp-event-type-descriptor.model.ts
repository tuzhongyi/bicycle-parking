import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	TPPEventTypeDescriptor (第三方事件类型描述)	*/
export class TPPEventTypeDescriptor implements IModel {
  /**	Int32	事件类型，全局唯一	M	*/
  EventType!: number;
  /**	String	事件名称	M	*/
  EventName!: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
}
