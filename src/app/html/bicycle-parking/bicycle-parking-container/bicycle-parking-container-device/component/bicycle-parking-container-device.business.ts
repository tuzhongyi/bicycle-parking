import { Injectable } from '@angular/core';
import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { BicycleParkingContainerDeviceItem } from './bicycle-parking-container-device.model';

@Injectable()
export class BicycleParkingContainerDeviceBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(divisionId: string) {
    let data = await this.service.statistic.number.get(divisionId);
    return [
      this.charger(data),
      this.smoker(data),
      this.camera(data),
      this.spray(data),
    ];
  }

  private camera(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '摄像机';
    item.type = 'camera';
    item.count = data.CameraNumber;
    item.value = data.CameraNumber - data.OfflineCameraNumber;
    return item;
  }
  private smoker(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '烟感报警器';
    item.type = 'smoker';
    item.count = data.SmokerNumber ?? 0;
    item.value = item.count - (data.OfflineSmokerNumber ?? 0);
    return item;
  }
  private charger(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '充电桩';
    item.type = 'charger';
    item.count = data.ChargerNumber ?? 0;
    item.value = item.count - (data.OfflineChargerNumber ?? 0);
    return item;
  }
  private spray(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '消防喷淋';
    item.type = 'spray';
    item.count = data.SpayerNumber ?? 0;
    item.value = item.count - (data.OfflineSpayerNumber ?? 0);
    return item;
  }
}
