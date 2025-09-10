import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartPieModel } from './bicycle-parking-container-event-record-chart-pie.model';

@Injectable()
export class BicycleParkingContainerEventRecordChartPieBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string, unit: TimeUnit) {
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let smoke = await this.service.smoke.load(divisionId, duration);
    let sensor = await this.service.sensor.load(divisionId, duration);

    let model = new BicycleParkingContainerEventRecordChartPieModel();

    model.smoker = smoke.length;

    sensor.forEach((x) => {
      switch (x.Data.SensorType) {
        case 1:
          model.charger++;
          break;
        case 2:
          model.smoker++;
          break;
        case 3:
          model.spray++;
          break;

        default:
          break;
      }
    });
    return model;
  }
}
