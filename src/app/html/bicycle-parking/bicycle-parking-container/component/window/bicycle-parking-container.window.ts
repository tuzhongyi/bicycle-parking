import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';
import { BicycleParkingContainerPictureWindow } from './bicycle-parking-container-picture.window';
import { BicycleParkingContainerStationDetailsWindow } from './bicycle-parking-container-station-details.window';
import { BicycleParkingContainerStationTableWindow } from './bicycle-parking-container-station-table.window';
import { BicycleParkingContainerVideoWindow } from './bicycle-parking-container-video.window';
import { BicycleParkingContainerEventSensorWindow } from './event/bicycle-parking-container-event-sensor.window';
import { BicycleParkingContainerEventSmokeWindow } from './event/bicycle-parking-container-event-smoke.window';
import { BicycleParkingContainerEventThirdPartWindow } from './event/bicycle-parking-container-event-thirdpart.window';

export class BicycleParkingContainerWindow {
  picture = new BicycleParkingContainerPictureWindow();
  video = new BicycleParkingContainerVideoWindow();

  station: {
    details: BicycleParkingContainerStationDetailsWindow;
    table: BicycleParkingContainerStationTableWindow;
  };
  event: {
    smoke: BicycleParkingContainerEventSmokeWindow;
    sensor: BicycleParkingContainerEventSensorWindow;
    thirdpart: BicycleParkingContainerEventThirdPartWindow;
  };

  constructor(that: BicycleParkingContainerComponent) {
    this.station = {
      details: new BicycleParkingContainerStationDetailsWindow(),
      table: new BicycleParkingContainerStationTableWindow(that),
    };
    this.event = {
      smoke: new BicycleParkingContainerEventSmokeWindow(that),
      sensor: new BicycleParkingContainerEventSensorWindow(that),
      thirdpart: new BicycleParkingContainerEventThirdPartWindow(that),
    };
  }
}
