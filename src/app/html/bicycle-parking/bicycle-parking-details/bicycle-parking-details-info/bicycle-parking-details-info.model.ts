import { Camera } from '../../../../common/network/model/garbage-station/camera.model';
import { Sensor } from '../../../../common/network/model/garbage-station/sensor/sensor.model';

export class BicycleParkingDetailsInfoData {
  smoke: Sensor[] = [];
  spray: Sensor[] = [];
  charger: Sensor[] = [];
  camera: Camera[] = [];
  door = [];
}
