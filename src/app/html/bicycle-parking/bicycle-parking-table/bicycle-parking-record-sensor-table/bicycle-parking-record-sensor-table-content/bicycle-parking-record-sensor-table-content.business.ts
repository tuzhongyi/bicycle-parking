import { Injectable } from '@angular/core';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { SensorEventRecord } from '../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { MediumRequestService } from '../../../../../common/network/model/medium/medium-request.service';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { GetEventRecordsParams } from '../../../../../common/network/request/event/event-request.params';
import { EventRequestService } from '../../../../../common/network/request/event/event-request.service';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage-station/garbage-station-request.service';
import {
  BicycleParkingRecordSensorTableArgs,
  BicycleParkingRecordSensorTableItem,
} from './bicycle-parking-record-sensor-table-content.model';

@Injectable()
export class BicycleParkingRecordSensorTableContentBusiness {
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
    args: BicycleParkingRecordSensorTableArgs
  ) {
    let source = await this.data.load(index, size, args);
    let paged = new PagedList<BicycleParkingRecordSensorTableItem>();
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

  private convert(data: SensorEventRecord) {
    let item = new BicycleParkingRecordSensorTableItem();
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
    return item;
  }

  private data = {
    load: (
      index: number,
      size: number,
      args: BicycleParkingRecordSensorTableArgs
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

      return this.service.event.record.sensor.list(parmas);
    },
  };
}
