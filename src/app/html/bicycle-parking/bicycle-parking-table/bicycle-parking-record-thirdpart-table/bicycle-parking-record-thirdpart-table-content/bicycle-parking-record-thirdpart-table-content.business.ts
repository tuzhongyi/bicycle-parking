import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../common/network/model/medium/medium-request.service';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ThirdPartEventRecord } from '../../../../../common/network/model/third-part/tpp-event-record.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { GetThirdPartEventsParams } from '../../../../../common/network/request/third-part/third-part-request.params';
import { ThirdPartRequestService } from '../../../../../common/network/request/third-part/third-part-request.service';
import {
  BicycleParkingRecordThirdPartTableArgs,
  BicycleParkingRecordThirdPartTableItem,
} from './bicycle-parking-record-thirdpart-table-content.model';

@Injectable()
export class BicycleParkingRecordThirdPartTableContentBusiness {
  constructor(
    thirdpart: ThirdPartRequestService,
    division: DivisionRequestService,
    private medium: MediumRequestService
  ) {
    this.service = { thirdpart, division };
  }

  private service: {
    thirdpart: ThirdPartRequestService;
    division: DivisionRequestService;
  };

  async load(
    index: number,
    size: number,
    args: BicycleParkingRecordThirdPartTableArgs
  ) {
    let source = await this.data.load(index, size, args);
    let paged = new PagedList<BicycleParkingRecordThirdPartTableItem>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => this.convert(x));
    return paged;
  }

  private convert(data: ThirdPartEventRecord) {
    let item = new BicycleParkingRecordThirdPartTableItem();
    item = Object.assign(item, data);
    if (data.DivisionId) {
      item.Division = this.service.division.cache.get(data.DivisionId);
    }
    item.images = [];
    if (item.Resources) {
      item.images = item.Resources.filter((x) => !!x.ImageUrl).map((x) =>
        this.medium.get(x.ImageUrl!)
      );
    }
    if (item.Assignment && item.Assignment.HandledImageUrls) {
      let urls = item.Assignment.HandledImageUrls.map((x) =>
        this.medium.get(x)
      );
      item.images = item.images.concat(urls);
    }

    item.EventName = this.data.types().then((types) => {
      let type = types.find((x) => x.EventType == item.EventType);
      if (type) {
        return type.EventName;
      }
      return '';
    });

    return item;
  }

  private data = {
    load: (
      index: number,
      size: number,
      args: BicycleParkingRecordThirdPartTableArgs
    ) => {
      let parmas = new GetThirdPartEventsParams();
      parmas.BeginTime = args.duration.begin;
      parmas.EndTime = args.duration.end;
      parmas.PageIndex = index;
      parmas.PageSize = size;
      if (args.gridcell) {
        parmas.GridCellIds = [args.gridcell];
      }
      if (args.type != undefined) {
        parmas.EventTypes = [args.type];
      }

      return this.service.thirdpart.event.list(parmas);
    },
    types: () => {
      return this.service.thirdpart.event.types().catch((x) => {
        return [];
      });
    },
  };
}
