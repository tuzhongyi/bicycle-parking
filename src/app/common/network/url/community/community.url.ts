import { BaseUrl } from '../base.url';

export class CommunityUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_management}/Communities`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excel() {
    return `${this.basic()}/Excels`;
  }
}
