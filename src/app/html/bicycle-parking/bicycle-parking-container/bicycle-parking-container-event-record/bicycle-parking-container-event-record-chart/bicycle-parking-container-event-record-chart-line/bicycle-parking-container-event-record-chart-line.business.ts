import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { SensorEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartLineModel } from './bicycle-parking-container-event-record-chart-line.model';

@Injectable()
export class BicycleParkingContainerEventRecordChartLineBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string, unit: TimeUnit) {
    let today = new Date();
    let duration = DateTimeTool.TimeUnit(unit, today);
    let sensor = await this.service.sensor.load(divisionId, duration);
    let smoke = await this.service.smoke.load(divisionId, duration);
    let model = new BicycleParkingContainerEventRecordChartLineModel();

    // 按照传感器类型分组
    let group = ArrayTool.groupBy<SensorEventRecord, number>(sensor, (x) => {
      return x.Data.SensorType;
    });

    model.smoker = this.convert(smoke, today, unit);
    model.charger = this.convert(group[1] ?? [], today, unit);
    model.spray = this.convert(group[3] ?? [], today, unit);
    return model;
  }

  private convert(
    datas: IEventRecord[],
    today: Date,
    unit: TimeUnit
  ): number[] {
    let result: number[] = [];
    let last = 0;
    switch (unit) {
      case TimeUnit.Year:
        last = today.getMonth() + 1;
        break;
      case TimeUnit.Month:
      default:
        last = today.getDate();
        break;
    }
    let group = ArrayTool.groupBy<IEventRecord, number>(datas, (x) => {
      switch (unit) {
        case TimeUnit.Year:
          return x.EventTime.getMonth() + 1;
        case TimeUnit.Month:

        default:
          return x.EventTime.getDate();
      }
    });
    for (let i = 0; i < last; i++) {
      let current = group[i + 1];
      if (current) {
        result.push(current.length);
      } else {
        result.push(0);
      }
    }
    return result;
  }
}
