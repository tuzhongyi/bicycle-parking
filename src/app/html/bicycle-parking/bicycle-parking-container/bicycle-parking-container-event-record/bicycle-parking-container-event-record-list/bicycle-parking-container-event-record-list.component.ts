import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SensorType } from '../../../../../common/enum/sensor/sensor-type.enum';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { SensorEventRecord } from '../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';
import { Language } from '../../../../../common/tools/language';
import { BicycleParkingContainerEventRecordService } from '../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordListBusiness } from './bicycle-parking-container-event-record-list.business';

@Component({
  selector: 'howell-bicycle-parking-container-event-record-list',
  imports: [CommonModule],
  templateUrl: './bicycle-parking-container-event-record-list.component.html',
  styleUrl: './bicycle-parking-container-event-record-list.component.less',
  providers: [
    BicycleParkingContainerEventRecordService,
    BicycleParkingContainerEventRecordListBusiness,
  ],
})
export class BicycleParkingContainerEventRecordListComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<string>;
  @Output() picture = new EventEmitter<SensorEventRecord>();
  @Output() video = new EventEmitter<SensorEventRecord>();

  constructor(
    private business: BicycleParkingContainerEventRecordListBusiness,
    private detector: ChangeDetectorRef,
    private global: GlobalStorageService
  ) {}

  @ViewChild('body') body?: ElementRef<HTMLElement>;

  table = {
    widths: ['108px', 'auto', '154px', '75px', '64px'],
    datas: [] as IEventRecord[],
    selected: undefined as SensorEventRecord | undefined,
    language: {
      color: (value: number) => {
        switch (value) {
          case SensorType.Charger:
            return;
        }
      },
    },
  };

  Language = Language;
  Color = ColorTool;
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
    this.business.load(divisionId).then((x) => {
      this.table.datas = x;
    });
  }

  on = {
    select: (item: SensorEventRecord) => {
      this.table.selected = item;
    },
    picture: (item: SensorEventRecord) => {
      this.picture.emit(item);
    },
    video: (item: SensorEventRecord) => {
      this.video.emit(item);
    },
  };
}
