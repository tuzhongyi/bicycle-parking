export class PathToolConfig {
  constructor(private node: string) {}

  get mqtt() {
    return `${this.node}/assets/config/mqtt.json`;
  }
}
