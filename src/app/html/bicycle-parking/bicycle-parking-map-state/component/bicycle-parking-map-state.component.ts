import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StationState } from '../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../common/tools/flags';
import { BicycleParkingMapStateItemComponent } from '../bicycle-parking-map-state-item/bicycle-parking-map-state-item.component';
import { BicycleParkingMapStateItem } from '../bicycle-parking-map-state-item/bicycle-parking-map-state-item.model';

@Component({
  selector: 'howell-bicycle-parking-map-state',
  imports: [CommonModule, BicycleParkingMapStateItemComponent],
  templateUrl: './bicycle-parking-map-state.component.html',
  styleUrl: './bicycle-parking-map-state.component.less',
})
export class BicycleParkingMapStateComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<GarbageStation[]>;
  @Output() itemclick = new EventEmitter<StationState>();

  constructor() {}

  datas: BicycleParkingMapStateItem[] = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
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

  load(datas: GarbageStation[]) {
    let all = new BicycleParkingMapStateItem();
    all.name = '全部车棚';
    all.value = datas.length;
    all.type = 'all';

    let normal = new BicycleParkingMapStateItem();
    normal.name = '正常车棚';
    normal.type = 'normal';
    normal.state = StationState.Normal;

    let alarm = new BicycleParkingMapStateItem();
    alarm.name = '火灾预警';
    alarm.type = 'alarm';
    alarm.state = StationState.Smoke;

    let offline = new BicycleParkingMapStateItem();
    offline.name = '离线车棚';
    offline.type = 'offline';
    offline.state = StationState.Error;

    datas.forEach((x) => {
      let flags = new Flags(x.StationState);
      if (flags.contains(StationState.Error)) {
        offline.value++;
      } else if (flags.contains(StationState.Smoke)) {
        alarm.value++;
      } else {
        normal.value++;
      }
    });

    this.datas = [all, normal, alarm, offline];
  }

  on = {
    item: (data: BicycleParkingMapStateItem) => {
      this.itemclick.emit(data.state);
    },
  };
}
