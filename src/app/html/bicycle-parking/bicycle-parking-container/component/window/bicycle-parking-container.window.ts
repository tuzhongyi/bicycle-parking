import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';
import { BicycleParkingContainerPictureWindow } from './bicycle-parking-container-picture.window';
import { BicycleParkingContainerStationDetailsWindow } from './bicycle-parking-container-station-details.window';
import { BicycleParkingContainerStationTableWindow } from './bicycle-parking-container-station-table.window';
import { BicycleParkingContainerVideoWindow } from './bicycle-parking-container-video.window';

export class BicycleParkingContainerWindow {
  picture = new BicycleParkingContainerPictureWindow();
  video = new BicycleParkingContainerVideoWindow();

  station: {
    details: BicycleParkingContainerStationDetailsWindow;
    table: BicycleParkingContainerStationTableWindow;
  };

  constructor(that: BicycleParkingContainerComponent) {
    this.station = {
      details: new BicycleParkingContainerStationDetailsWindow(),
      table: new BicycleParkingContainerStationTableWindow(that),
    };
  }
}
