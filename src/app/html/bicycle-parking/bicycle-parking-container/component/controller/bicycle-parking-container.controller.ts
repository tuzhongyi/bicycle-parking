import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';
import { BicycleParkingContainerMapController } from './bicycle-parking-container-map.controller';
import { BicycleParkingContainerStateController } from './bicycle-parking-container-state.controller';
import { BicycleParkingContainerVideoController } from './bicycle-parking-container-video.controller';
import { BicycleParkingContainerCardController } from './card/bicycle-parking-container-card.controller';

export class BicycleParkingContainerController {
  public state: BicycleParkingContainerStateController;
  public map: BicycleParkingContainerMapController;
  public card: BicycleParkingContainerCardController;
  public video: BicycleParkingContainerVideoController;
  constructor(that: BicycleParkingContainerComponent) {
    this.state = new BicycleParkingContainerStateController(that);
    this.map = new BicycleParkingContainerMapController(that);
    this.card = new BicycleParkingContainerCardController();
    this.video = new BicycleParkingContainerVideoController();
  }
}
