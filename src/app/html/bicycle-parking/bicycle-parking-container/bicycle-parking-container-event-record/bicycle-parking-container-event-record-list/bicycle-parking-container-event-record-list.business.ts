import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { BicycleParkingContainerEventRecordService } from '../service/bicycle-parking-container-event-record.service';

@Injectable()
export class BicycleParkingContainerEventRecordListBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string, unit: TimeUnit) {
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

    let records = await this.service.smoke.load(divisionId, duration);
    records = records.sort((a, b) => {
      return LocaleCompare.compare(b.EventTime, a.EventTime);
    });
    return records;
  }
}
