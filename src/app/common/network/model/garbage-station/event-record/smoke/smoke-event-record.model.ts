import { Transform } from 'class-transformer';
import { transformDateTime } from '../../../transform.model';
import { CameraImageUrl } from '../../../url.model';
import { EventRecordData } from '../garbage-event-record.model';

export class SmokeEventRecord extends EventRecordData<SmokeEventData> {}
export class SmokeEventData {
  /**	String	垃圾房ID	M	*/
  StationId!: string;
  /**	String	垃圾房名称	M	*/
  StationName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	Boolean	是否正在报警	O	*/
  IsAlarming?: boolean;
  /**	CameraImageUrl[]	图片ID、图片地址列表	O	*/
  CameraImageUrls?: CameraImageUrl[];
  /**	String	网格单元ID	O	*/
  GridCellId?: string;
  /**	String	网格单元名称	O	*/
  GridCellName?: string;
  /**	String	小区ID	O	*/
  CommunityId?: string;
  /**	String	小区名称	O	*/
  CommunityName?: string;
  /**	Boolean	处置人员是否已处置	O */
  Processed?: boolean;
  /**	String	处置人员名称	O */
  ProcessorName?: string;
  /**	String	处置人员ID	O */
  ProcessorId?: string;
  /**	String	手机号码	O */
  ProcessorMobileNo?: string;
  /**	DateTime	处置时间	O */
  @Transform(transformDateTime)
  ProcessTime?: Date;
  /**	String	处置描述	O */
  ProcessDescription?: string;
  /**	String	处置照片	O */
  ProcessImageUrl?: string;
}
