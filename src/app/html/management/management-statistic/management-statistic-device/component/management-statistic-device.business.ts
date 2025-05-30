import { Injectable } from '@angular/core';
import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { BicycleParkingContainerDeviceItem } from '../../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-device/component/bicycle-parking-container-device.model';

@Injectable()
export class ManagementStatisticDeviceBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(divisionId: string) {
    let data = await this.service.statistic.number.get(divisionId);
    return {
      parking: this.parking(data),
      charger: this.charger(data),
      smoker: this.smoker(data),
      camera: this.camera(data),
      spray: this.spray(data),
    };
  }

  parking(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '车棚';
    item.type = 'parking';
    item.count = data.StationNumber;
    item.value = data.StationNumber;
    return item;
  }

  camera(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '摄像机';
    item.type = 'camera';
    item.count = data.CameraNumber;
    item.value = data.CameraNumber - data.OfflineCameraNumber;
    return item;
  }
  smoker(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '烟感报警器';
    item.type = 'smoker';
    item.count = data.SmokerNumber ?? 0;
    item.value = item.count - (data.OfflineSmokerNumber ?? 0);
    return item;
  }
  charger(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '充电桩';
    item.type = 'charger';
    item.count = data.ChargerNumber ?? 0;
    item.value = item.count - (data.OfflineChargerNumber ?? 0);
    return item;
  }
  spray(data: DivisionNumberStatistic) {
    let item = new BicycleParkingContainerDeviceItem();
    item.name = '消防喷淋';
    item.type = 'spray';
    item.count = data.SpayerNumber ?? 0;
    item.value = item.count - (data.OfflineSpayerNumber ?? 0);
    return item;
  }
}
