import { GisPoint } from '../../model/garbage-station/gis-point.model';
import { DurationParams, PagedDurationParams } from '../IParams.interface';

export class GetThirdPartEventsParams extends PagedDurationParams {
  /**	String[]	时间ID	O	*/
  Ids?: string[];
  /**	Int32[]	事件类型	O	*/
  EventTypes?: number[];
  /**	Boolean	是否已派单，true：已派单	O	*/
  Assigned?: boolean;
  /**	Boolean	是否已处置，true：已处置	O	*/
  Handled?: boolean;
  /**	Boolean	是否为误报，true：误报	O	*/
  IsMisInfo?: boolean;
  /**	String	资源名称	O	*/
  ResourceName?: string;
  /**	String[]	区划列表	O	*/
  DivisionIds?: string[];
  /**	String[]	网格列表	O	*/
  GridCellIds?: string[];
  /**	Boolean	是否已确认	O	*/
  Confirmed?: boolean;
  /**	GisPoint	照片Gis坐标	D	*/
  Location?: GisPoint;
  /**	Double	单位：米，必须与Location一起出现	D	*/
  LocationDistance?: number;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class GetTPEventNumbersParams extends DurationParams {
  /**	Int32[]	事件类型	M */
  EventTypes!: number[];
  /**	String	区划ID	O */
  DivisionId?: string;
}
