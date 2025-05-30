import { Transform } from 'class-transformer';
import { IIdModel } from '../../model.interface';
import { transformDateTime } from '../../transform.model';

/**	SensorValue (传感器读数)	*/
export class SensorValue implements IIdModel<number> {
  /**
   * Int32
   * 数值对应的ID，从1开始
   * 1：电压 V，2：电量 0-100，3：压力MPa(兆帕)
   * M
   **/
  Id!: number;
  /**	String	数值	O	*/
  Value?: string;
  /**	String	数值名称	O	*/
  Name?: string;
  /**	String	数值单位	O	*/
  Unit?: string;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
