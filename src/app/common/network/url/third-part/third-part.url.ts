import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class ThirdPartUrl {
  private static basic() {
    return `${BaseUrl.garbage.garbage_management}/ThirdParts`;
  }

  static event() {
    return new ThirdPartEventUrl(this.basic());
  }
}

class ThirdPartEventUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }

  types() {
    return `${this.basic()}/Types`;
  }

  handle(id: string) {
    return `${this.item(id)}/Handle`;
  }
  statistic = {
    number: () => {
      return `${this.basic()}/Statistics/Numbers`;
    },
  };
}
