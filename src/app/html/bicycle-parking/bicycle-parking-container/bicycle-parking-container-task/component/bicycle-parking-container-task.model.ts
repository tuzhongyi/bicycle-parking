export class BicycleParkingContainerTaskModel {
  get ratio() {
    if (this.count === 0) return 100;
    return Math.floor((this.handled / this.count) * 100);
  }
  count = 0;
  handled = 0;
  unhandled = 0;
}
