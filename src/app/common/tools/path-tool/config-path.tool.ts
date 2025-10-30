export class PathToolConfig {
  constructor(private node: string) {}

  get mqtt() {
    return `${this.node}/assets/config/mqtt.json`;
  }
  get version() {
    return `${this.node}/assets/config/version.json`;
  }
}
