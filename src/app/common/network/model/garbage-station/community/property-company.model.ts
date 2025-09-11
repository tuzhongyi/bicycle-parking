import { IModel } from '../../model.interface';
/**	PropertyCompany (物业公司)	*/
export class PropertyCompany implements IModel {
  /**	String	物业名称	M	*/
  Name!: string;
  /**	String	地址	O	*/
  Address?: string;
  /**	String	联系电话	O	*/
  Phone?: string;
  /**	String	联系人姓名	O	*/
  PersonName?: string;
}
