import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class ThirdPartEventHandleParams implements IModel {
  /**	Boolean	是否已处置，true：已处置	M	*/
  Handled!: boolean;
  /**	String	处置人员名称	O	*/
  Handler?: string;
  /**	DateTime	处置时间	O	*/
  @Transform(transformDateTime)
  HandledTime?: Date;
  /**	String[]	处置图片地址	O	*/
  HandledImageUrls?: string[];
  /**	String	处置描述	O	*/
  HandleDescription?: string;
}
