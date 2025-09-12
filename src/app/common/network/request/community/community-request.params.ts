import { PagedParams } from '../IParams.interface';

export class GetCommunitiesParams extends PagedParams {
  /**	String[]	小区ID	O	*/
  Ids?: string[];
  /**	String	小区名称，支持LIKE	O	*/
  Name?: string;
  /**	String	地址，支持LIKE	O	*/
  Address?: string;
  /**	Int32	性质	O	*/
  Nature?: number;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	网格单元ID	O	*/
  GridCellId?: string;
}
