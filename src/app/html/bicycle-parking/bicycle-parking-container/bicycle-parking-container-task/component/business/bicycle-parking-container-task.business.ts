import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { GetEventRecordsParams } from '../../../../../../common/network/request/event/event-request.params';
import { EventRequestService } from '../../../../../../common/network/request/event/event-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerTaskModel } from '../bicycle-parking-container-task.model';

@Injectable()
export class BicycleParkingContainerTaskBusiness {
  constructor(private service: EventRequestService) {}

  async load(divisionId: string, unit: TimeUnit) {
    let datas = await this.data(divisionId, unit);
    let model = new BicycleParkingContainerTaskModel();
    model.count = datas.length;
    let processeds = datas.filter((x) => x.Data.Processed);
    model.handled = processeds.length;
    model.unhandled = model.count - model.handled;
    return model;
  }

  private data(divisionId: string, unit: TimeUnit) {
    let duration: Duration;
    switch (unit) {
      case TimeUnit.Year:
        duration = DateTimeTool.allYear(new Date());
        break;
      case TimeUnit.Month:
        duration = DateTimeTool.allMonth(new Date());
        break;
      case TimeUnit.Week:
        duration = DateTimeTool.allWeek(new Date());
        break;
      case TimeUnit.Day:
        duration = DateTimeTool.allDay(new Date());
        break;
      default:
        throw new Error(`Unsupported time unit: ${unit}`);
    }
    let params = new GetEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [divisionId];
    return this.service.record.smoke.all(params);
  }
}
