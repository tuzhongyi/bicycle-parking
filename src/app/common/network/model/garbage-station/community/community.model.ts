import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../model.interface';
import { transformDateTime } from '../../transform.model';
import { GisArea } from '../gis-area.model';
import { GisPoint } from '../gis-point.model';
import { PropertyCompany } from './property-company.model';

/**	Community (小区)	*/
export class Community implements IIdNameModel {
  /**	String	小区ID	M	*/
  Id!: string;
  /**	String	小区名称	M	*/
  Name!: string;
  /**	Int32	人口	O	*/
  Population?: number;
  /**	String	地址	O	*/
  Address?: string;
  /**	String	区划ID，一般都是居委会	O	*/
  DivisionId?: string;
  /**	String	所属网格单元ID	O	*/
  GridCellId?: string;
  /**	Int32	户数	O	*/
  Households?: number;
  /**	Int32	楼栋数量	O	*/
  BuildingCount?: number;
  /**	Int32	高层建筑数量	O	*/
  HighRiseCount?: number;
  /**	Int32	多层建筑数量	O	*/
  MultistoreyCount?: number;
  /**	Double	面积：平方米	O	*/
  Area?: number;
  /**	Int32	"性质：
1：居住（高层、多层、独幢别墅、联排别墅）
2：非居住（商业办公、公共事业）"	O	*/
  Nature?: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	DateTime	建造时间	O	*/
  @Transform(transformDateTime) ConstructionTime?: Date;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime) CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime) UpdateTime!: Date;
  /**	GisPoint	区划中心GIS点位	O	*/
  GisPoint?: GisPoint;
  /**	GisArea	区划GIS点位区域	O	*/
  GisArea?: GisArea;
  /**	PropertyCompany	物业公司信息	O	*/
  PropertyCompany?: PropertyCompany;
}
