import { Injectable } from '@angular/core';
import { BicycleParkingContainerMapController } from './bicycle-parking-container-map.controller';
import { BicycleParkingContainerStateController } from './bicycle-parking-container-state.controller';
import { BicycleParkingContainerVideoController } from './bicycle-parking-container-video.controller';
import { BicycleParkingContainerCardController } from './card/bicycle-parking-container-card.controller';

@Injectable()
export class BicycleParkingContainerController {
  constructor(
    public state: BicycleParkingContainerStateController,
    public map: BicycleParkingContainerMapController,
    public card: BicycleParkingContainerCardController,
    public video: BicycleParkingContainerVideoController
  ) {}
}
