import { Injectable } from '@angular/core';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { BicycleParkingContainerEventRecordService } from '../service/bicycle-parking-container-event-record.service';

@Injectable()
export class BicycleParkingContainerEventRecordListBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string) {
    let duration = DateTimeTool.allMonth(new Date());
    let records = await this.service.smoke.load(divisionId, duration);
    records = records.sort((a, b) => {
      return LocaleCompare.compare(b.EventTime, a.EventTime);
    });
    return records;
  }
}
