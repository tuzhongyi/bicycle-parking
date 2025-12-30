import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { SmokeEventRecord } from '../../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { Page } from '../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../common/tools/component-tool/table-abstract.component';
import { BicycleParkingRecordSmokeTableContentBusiness } from './bicycle-parking-record-smoke-table-content.business';
import {
  BicycleParkingRecordSmokeTableArgs,
  BicycleParkingRecordSmokeTableItem,
} from './bicycle-parking-record-smoke-table-content.model';

@Component({
  selector: 'howell-bicycle-parking-record-smoke-table-content',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl: './bicycle-parking-record-smoke-table-content.component.html',
  styleUrl: './bicycle-parking-record-smoke-table-content.component.less',
  providers: [BicycleParkingRecordSmokeTableContentBusiness],
})
export class BicycleParkingRecordSmokeTableContentComponent
  extends PagedTableAbstractComponent<BicycleParkingRecordSmokeTableItem>
  implements OnInit
{
  @Input() load?: EventEmitter<BicycleParkingRecordSmokeTableArgs>;
  @Input() isoperation = true;
  @Input() args = new BicycleParkingRecordSmokeTableArgs();
  @Output() image: EventEmitter<PagedArgs<SmokeEventRecord>> =
    new EventEmitter();
  @Output() video: EventEmitter<SmokeEventRecord> = new EventEmitter();

  constructor(private business: BicycleParkingRecordSmokeTableContentBusiness) {
    super();
  }

  StationState = StationState;
  widths = ['20%', '15%'];

  selected?: BicycleParkingRecordSmokeTableItem;

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
      item: BicycleParkingRecordSmokeTableItem,
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
    select: (item?: BicycleParkingRecordSmokeTableItem) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    video: (e: Event, item?: BicycleParkingRecordSmokeTableItem) => {
      if (item) {
        this.video.emit(item);
        if (this.selected == item) {
          e.stopImmediatePropagation();
        }
      }
    },
    download: {
      picture: (e: Event, item?: BicycleParkingRecordSmokeTableItem) => {
        if (item) {
          if (item.images && item.images.length > 0) {
            this.business.download.image(
              item.images[0],
              item.Data.StationName,
              item.EventTime
            );
          }

          if (this.selected == item) {
            e.stopImmediatePropagation();
          }
        }
      },
      video: (e: Event, item?: BicycleParkingRecordSmokeTableItem) => {
        if (item) {
          if (
            item.Data.CameraImageUrls &&
            item.Data.CameraImageUrls.length > 0
          ) {
            let camera = item.Data.CameraImageUrls[0];
            this.business.download.video(
              item.Data.StationId,
              camera.CameraId,
              item.EventTime
            );
          }

          if (this.selected == item) {
            e.stopImmediatePropagation();
          }
        }
      },
    },
  };
}
