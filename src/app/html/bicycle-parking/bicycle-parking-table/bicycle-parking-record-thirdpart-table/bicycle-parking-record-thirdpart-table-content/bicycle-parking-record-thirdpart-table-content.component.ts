import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { Page } from '../../../../../common/network/model/page_list.model';
import { ThirdPartEventRecord } from '../../../../../common/network/model/third-part/tpp-event-record.model';
import { PagedTableAbstractComponent } from '../../../../../common/tools/component-tool/table-abstract.component';
import { BicycleParkingRecordThirdPartTableContentBusiness } from './bicycle-parking-record-thirdpart-table-content.business';
import {
  BicycleParkingRecordThirdPartTableArgs,
  BicycleParkingRecordThirdPartTableItem,
} from './bicycle-parking-record-thirdpart-table-content.model';

@Component({
  selector: 'howell-bicycle-parking-record-thirdpart-table-content',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl:
    './bicycle-parking-record-thirdpart-table-content.component.html',
  styleUrl: './bicycle-parking-record-thirdpart-table-content.component.less',
  providers: [BicycleParkingRecordThirdPartTableContentBusiness],
})
export class BicycleParkingRecordThirdPartTableContentComponent
  extends PagedTableAbstractComponent<BicycleParkingRecordThirdPartTableItem>
  implements OnInit
{
  @Input() load?: EventEmitter<BicycleParkingRecordThirdPartTableArgs>;
  @Input() isoperation = true;
  @Input() args = new BicycleParkingRecordThirdPartTableArgs();
  @Output() image: EventEmitter<PagedArgs<ThirdPartEventRecord>> =
    new EventEmitter();
  @Output() video: EventEmitter<ThirdPartEventRecord> = new EventEmitter();

  constructor(
    private business: BicycleParkingRecordThirdPartTableContentBusiness
  ) {
    super();
  }

  StationState = StationState;
  widths = ['10%', 'auto', '10%', '10%', '15%', '10%', '10%'];

  selected?: BicycleParkingRecordThirdPartTableItem;

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
      item: BicycleParkingRecordThirdPartTableItem,
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
    select: (item?: BicycleParkingRecordThirdPartTableItem) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    video: (e: Event, item?: BicycleParkingRecordThirdPartTableItem) => {
      if (item) {
        this.video.emit(item);
        if (this.selected == item) {
          e.stopImmediatePropagation();
        }
      }
    },
  };
}
