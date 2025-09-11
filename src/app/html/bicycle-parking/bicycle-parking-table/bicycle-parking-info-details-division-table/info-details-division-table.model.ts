import { Community } from '../../../../common/network/model/garbage-station/community/community.model';
import { Division } from '../../../../common/network/model/garbage-station/division.model';
import { GridCell } from '../../../../common/network/model/garbage-station/grid-cell.model';
import { Member } from '../../../../common/network/model/garbage-station/member.model';

export class InfoDetailsDivisionTableItem {
  Division?: Division;
  GridCell?: GridCell;
  Community?: Community;

  Id: string = '';

  get name() {
    if (this.Community) {
      return this.Community.Name;
    }
    if (this.GridCell) {
      return this.GridCell.Name;
    }
    if (this.Division) {
      return this.Division.Name;
    }
    return '';
  }

  get type() {
    if (this.Community) {
      return '小区责任人';
    }
    if (this.GridCell) {
      return '网格员';
    }
    if (this.Division) {
      return '街道责任人';
    }
    return '';
  }

  member: {
    count: number;
    default?: Member;
  } = { count: 0 };
}
export class InfoDetailsDivisionTableArgs {
  divisionId?: string;
}
