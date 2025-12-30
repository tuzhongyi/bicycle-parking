import { Injectable } from '@angular/core';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { SmokeEventRecord } from '../../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { MediumRequestService } from '../../../../../common/network/model/medium/medium-request.service';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { GetEventRecordsParams } from '../../../../../common/network/request/event/event-request.params';
import { EventRequestService } from '../../../../../common/network/request/event/event-request.service';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage-station/garbage-station-request.service';
import {
  BicycleParkingRecordSmokeTableArgs,
  BicycleParkingRecordSmokeTableItem,
} from './bicycle-parking-record-smoke-table-content.model';

@Injectable()
export class BicycleParkingRecordSmokeTableContentBusiness {
  constructor(
    event: EventRequestService,
    division: DivisionRequestService,
    station: GarbageStationRequestService,
    private medium: MediumRequestService
  ) {
    this.service = { division, event, station };
  }
  private service: {
    station: GarbageStationRequestService;
    division: DivisionRequestService;
    event: EventRequestService;
  };

  async load(
    index: number,
    size: number,
    args: BicycleParkingRecordSmokeTableArgs
  ) {
    let source = await this.data.load(index, size, args);
    let paged = new PagedList<BicycleParkingRecordSmokeTableItem>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => this.convert(x));
    return paged;
  }

  download = {
    video: (stationId: string, cameraId: string, time: Date) => {
      this.service.station.download.video(stationId, cameraId, time);
    },
    image: (url: string, name: string, time: Date) => {
      this.service.station.download.image(url, name, time);
    },
  };

  private convert(data: SmokeEventRecord) {
    let item = new BicycleParkingRecordSmokeTableItem();
    item = Object.assign(item, data);
    if (item.Data.DivisionId) {
      let committees = this.service.division.cache.get(item.Data.DivisionId);
      item.County = new Promise<Division>((resolve) => {
        committees.then((x) => {
          if (x.ParentId) {
            this.service.division.cache.get(x.ParentId).then((county) => {
              resolve(county);
            });
          }
        });
      });
    }
    item.images = [];
    if (item.Data.CameraImageUrls) {
      item.images = item.Data.CameraImageUrls.map((x) =>
        this.medium.get(x.ImageUrl)
      );
    }
    if (item.Data.ProcessImageUrl) {
      item.images.push(this.medium.get(item.Data.ProcessImageUrl));
    }

    return item;
  }

  private data = {
    load: (
      index: number,
      size: number,
      args: BicycleParkingRecordSmokeTableArgs
    ) => {
      let parmas = new GetEventRecordsParams();
      parmas.BeginTime = args.duration.begin;
      parmas.EndTime = args.duration.end;
      parmas.PageIndex = index;
      parmas.PageSize = size;
      if (args.gridcell) {
        parmas.GridCellIds = [args.gridcell];
      }
      if (args.name) {
        parmas.StationName = args.name;
      }

      return this.service.event.record.smoke.list(parmas);
    },
  };
}
