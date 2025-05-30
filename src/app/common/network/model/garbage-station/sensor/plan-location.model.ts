import { IModel } from '../../model.interface';

/**	PlanLocation (平面图位置)	*/
export class PlanLocation implements IModel {
  /**	Boolean	是否在平面图上显示	O	*/
  Enabled?: boolean;
  /**	Double	X轴坐标	M	*/
  X!: number;
  /**	Double	Y轴坐标	M	*/
  Y!: number;
}
