import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { BicycleParkingContainerDeviceItemComponent } from '../bicycle-parking-container-device-item/bicycle-parking-container-device-item.component';
import { BicycleParkingContainerDeviceBusiness } from './bicycle-parking-container-device.business';
import { BicycleParkingContainerDeviceItem } from './bicycle-parking-container-device.model';

@Component({
  selector: 'howell-bicycle-parking-container-device',
  imports: [CommonModule, BicycleParkingContainerDeviceItemComponent],
  templateUrl: './bicycle-parking-container-device.component.html',
  styleUrl: './bicycle-parking-container-device.component.less',
  providers: [BicycleParkingContainerDeviceBusiness],
})
export class BicycleParkingContainerDeviceComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<string>;

  constructor(
    private business: BicycleParkingContainerDeviceBusiness,
    private global: GlobalStorageService
  ) {}

  datas: BicycleParkingContainerDeviceItem[] = [];

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private init() {
    this.global.division.selected.then((x) => {
      this.load(x.Id);
    });
  }

  private load(divisionId: string) {
    this.business.load(divisionId).then((datas) => {
      this.datas = datas;
    });
  }
}
