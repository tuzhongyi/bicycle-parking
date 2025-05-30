import { Sensor } from '../../../model/garbage-station/sensor/sensor.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';

export class GarbageStationSensorRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(Sensor);
  }

  private type: HowellBaseTypeRequestService<Sensor>;

  array(stationId: string) {
    let url = GarbageStationUrl.sensor(stationId).basic();
    return this.type.getArray(url);
  }

  create(stationId: string, data: Sensor): Promise<Sensor> {
    let url = GarbageStationUrl.sensor(stationId).basic();
    return this.type.post(url, data);
  }

  get(stationId: string, sensorId: string): Promise<Sensor> {
    let url = GarbageStationUrl.sensor(stationId).item(sensorId);
    return this.type.get(url);
  }
  delete(stationId: string, sensorId: string): Promise<Sensor> {
    let url = GarbageStationUrl.sensor(stationId).item(sensorId);
    return this.type.delete(url);
  }
  update(stationId: string, data: Sensor): Promise<Sensor> {
    let url = GarbageStationUrl.sensor(stationId).item(data.Id);
    return this.type.put(url, data);
  }
}
