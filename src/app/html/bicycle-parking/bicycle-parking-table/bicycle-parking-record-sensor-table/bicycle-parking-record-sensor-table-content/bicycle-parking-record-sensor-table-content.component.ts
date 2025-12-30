import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { SensorEventRecord } from '../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { Page } from '../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../common/tools/component-tool/table-abstract.component';
import { BicycleParkingRecordSensorTableContentBusiness } from './bicycle-parking-record-sensor-table-content.business';
import {
  BicycleParkingRecordSensorTableArgs,
  BicycleParkingRecordSensorTableItem,
} from './bicycle-parking-record-sensor-table-content.model';

@Component({
  selector: 'howell-bicycle-parking-record-sensor-table-content',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl: './bicycle-parking-record-sensor-table-content.component.html',
  styleUrl: './bicycle-parking-record-sensor-table-content.component.less',
  providers: [BicycleParkingRecordSensorTableContentBusiness],
})
export class BicycleParkingRecordSensorTableContentComponent
  extends PagedTableAbstractComponent<BicycleParkingRecordSensorTableItem>
  implements OnInit
{
  @Input() load?: EventEmitter<BicycleParkingRecordSensorTableArgs>;
  @Input() isoperation = true;
  @Input() args = new BicycleParkingRecordSensorTableArgs();
  @Output() image: EventEmitter<PagedArgs<SensorEventRecord>> =
    new EventEmitter();
  @Output() video: EventEmitter<SensorEventRecord> = new EventEmitter();

  constructor(
    private business: BicycleParkingRecordSensorTableContentBusiness
  ) {
    super();
  }

  StationState = StationState;
  widths = ['15%'];

  selected?: BicycleParkingRecordSensorTableItem;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
    this.loadData(1, this.pageSize);
  }

  async loadData(index: number, size: number) {
    let promise = this.business.load(index, size, this.args);
    this.loading = true;
    promise
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
        while (this.datas.length < this.page.PageSize) {
          this.datas.push(undefined);
        }
      })
      .finally(() => {
        this.loading = false;
      });
    return promise;
  }

  on = {
    page: (index: number) => {
      this.page.PageIndex = index;
      this.loadData(this.page.PageIndex, this.page.PageSize);
    },
    image: (
      e: Event,
      item: BicycleParkingRecordSensorTableItem,
      index: number
    ) => {
      this.image.emit({
        page: Page.create(index + 1),
        data: item,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    select: (item?: BicycleParkingRecordSensorTableItem) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
  };
}
