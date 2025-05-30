import { Injectable } from '@angular/core';
import { GetEventRecordsParams } from '../../../../../../common/network/request/event/event-request.params';
import { EventRequestService } from '../../../../../../common/network/request/event/event-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerTaskModel } from '../bicycle-parking-container-task.model';

@Injectable()
export class BicycleParkingContainerTaskBusiness {
  constructor(private service: EventRequestService) {}

  async load(divisionId: string) {
    let paged = await this.data(divisionId);
    let model = new BicycleParkingContainerTaskModel();
    model.count = paged.Page.TotalRecordCount;
    model.handled = paged.Page.TotalRecordCount;
    model.unhandled = 0;
    return model;
  }

  private data(divisionId: string) {
    let duration = DateTimeTool.allMonth(new Date());
    let params = new GetEventRecordsParams();
    params.PageSize = 1;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [divisionId];
    return this.service.record.smoke.list(params);
  }
}
