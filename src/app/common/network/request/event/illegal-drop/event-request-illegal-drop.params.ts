import { IParams } from '../../IParams.interface';
import { GetEventRecordsParams } from '../event-request.params';

export class GetEventRecordIllegalDropParams extends GetEventRecordsParams {
  /**	Int32[]	过滤事件类型	O */
  EventTypes?: number[];
}

export class GarbageFeedbackParams implements IParams {
  /**	Double	反馈时距离，单位：米	O	*/
  FeedbackDistance?: number;
  /**	String	反馈人员名称	M	*/
  FeedbackUserName!: string;
  /**	String	反馈人员ID	M	*/
  FeedbackUserId!: string;
  /**	String	反馈人员手机号码	O	*/
  FeedbackUserMobileNo?: string;
  /**	Int32	1-街道管理人员，2-居委管理人员，3-志愿者，4-物业管理人员，5-其他，6-第三方。	M	*/
  FeedbackUserType!: number;
  /**	Int32	"反馈结果：
1：完成，2：误报，3：管理不规范"	M	*/
  FeedbackResult!: number;
  /**	String	反馈描述	O	*/
  FeedbackDescription?: string;
  /**	String[]	反馈照片	O	*/
  FeedbackImageUrls?: string[];
}

export class GarbageDropSuperviseParams implements IParams {
  /**	String	督办人员	O	*/
  Supervisor?: string;
  /**	String	督办时通知的人员ID	O	*/
  CallUserId?: string;
  /**	String	督办时通知的人员姓名	O	*/
  CallUserName?: string;
  /**	String	督办时通知的人员手机号码	O	*/
  CallUserMobileNo?: string;
  /**	Boolean	是否发送微信通知，默认：false不发送	O	*/
  WechatNotification?: boolean;
}
export class GarbageDropSuperviseResultParams implements IParams {
  /**	String	督办人员	O	*/
  Supervisor?: string;
  /**	Int32	"督办结果
1：完成，2：误报，3：管理不规范，4：无人响应，5：未按时间完成处置。"	M	*/
  SuperviseResult!: number;
  /**	String	督办描述	O	*/
  SuperviseDescription?: string;
}

export class GarbageDropAcceptParams implements IParams {
  /**	String	接单人员名称	M	*/
  AcceptedUserName!: string;
  /**	String	接单人员ID	M	*/
  AcceptedUserId!: string;
  /**	String	接单人员手机号码	O	*/
  AcceptedUserMobileNo?: string;
}
