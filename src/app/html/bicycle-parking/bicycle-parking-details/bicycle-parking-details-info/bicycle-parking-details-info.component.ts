import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorType } from '../../../../common/enum/sensor/sensor-type.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { Sensor } from '../../../../common/network/model/garbage-station/sensor/sensor.model';
import { BicycleParkingDetailsInfoContentComponent } from '../bicycle-parking-details-info-content/bicycle-parking-details-info-content.component';
import { BicycleParkingDetailsInfoItemComponent } from '../bicycle-parking-details-info-item/bicycle-parking-details-info-item.component';
import { BicycleParkingDetailsInfoItem } from '../bicycle-parking-details-info-item/bicycle-parking-details-info-item.model';
import { BicycleParkingDetailsInfoBusiness } from './bicycle-parking-details-info.business';

@Component({
  selector: 'howell-bicycle-parking-details-info',
  imports: [
    CommonModule,
    BicycleParkingDetailsInfoItemComponent,
    BicycleParkingDetailsInfoContentComponent,
  ],
  templateUrl: './bicycle-parking-details-info.component.html',
  styleUrl: './bicycle-parking-details-info.component.less',
  providers: [BicycleParkingDetailsInfoBusiness],
})
export class BicycleParkingDetailsInfoComponent implements OnInit {
  @Input() data?: GarbageStation;

  constructor(private business: BicycleParkingDetailsInfoBusiness) {}

  sensors: Sensor[] = [];
  datas: BicycleParkingDetailsInfoItem[] = [];
  selected?: BicycleParkingDetailsInfoItem;
  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);
    }
  }

  async load(data: GarbageStation) {
    let charger = new BicycleParkingDetailsInfoItem();
    charger.name = '充电桩';
    charger.type = 'charger';

    let smoke = new BicycleParkingDetailsInfoItem();
    smoke.name = '烟感报警器';
    smoke.type = 'smoke';

    let door = new BicycleParkingDetailsInfoItem();
    door.name = '逃生门';
    door.type = 'door';
    door.online = 1;

    let spayer = new BicycleParkingDetailsInfoItem();
    spayer.name = '消防喷淋';
    spayer.type = 'spayer';

    let camera = new BicycleParkingDetailsInfoItem();
    camera.name = '摄像机';
    camera.type = 'camera';

    if (data.Cameras) {
      data.Cameras.forEach((x) => {
        if (x.OnlineStatus == 0) {
          camera.online++;
        } else {
          camera.offline++;
        }
      });
    }

    this.sensors = await this.business.sensor(data.Id);
    this.sensors.forEach((sensor) => {
      switch (sensor.SensorType) {
        case SensorType.Charger:
          if (sensor.OnlineStatus == 0) {
            charger.online++;
          } else {
            charger.offline++;
          }
          break;
        case SensorType.Smoker:
          if (sensor.OnlineStatus == 0) {
            smoke.online++;
          } else {
            smoke.offline++;
          }
          break;
        case SensorType.Spayer:
          if (sensor.OnlineStatus == 0) {
            spayer.online++;
          } else {
            spayer.offline++;
          }
          break;
      }
    });

    this.datas = [charger, smoke, camera, door, spayer];
  }

  on = {
    select: (item: BicycleParkingDetailsInfoItem) => {
      this.selected = item;
    },
  };
}
