import { AbstractUrl } from '../../abstract.url';

export class SensorInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Sensors`);
  }
}
