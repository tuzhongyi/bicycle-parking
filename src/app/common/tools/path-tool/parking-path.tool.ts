export class PathToolParking {
  constructor(private node: string) {}

  get plan() {
    return `${this.node}/assets/config/image/parking-plan.png`;
  }
}
