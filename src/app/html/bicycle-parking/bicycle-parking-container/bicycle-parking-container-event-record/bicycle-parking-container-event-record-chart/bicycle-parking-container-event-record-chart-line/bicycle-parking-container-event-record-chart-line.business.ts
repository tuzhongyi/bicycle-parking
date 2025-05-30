import { Injectable } from '@angular/core';
import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { SensorEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartLineModel } from './bicycle-parking-container-event-record-chart-line.model';

@Injectable()
export class BicycleParkingContainerEventRecordChartLineBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string) {
    let today = new Date();
    let duration = DateTimeTool.allMonth(today);
    let sensor = await this.service.sensor.load(divisionId, duration);
    let smoke = await this.service.smoke.load(divisionId, duration);
    let model = new BicycleParkingContainerEventRecordChartLineModel();

    // 按照传感器类型分组
    let group = ArrayTool.groupBy<SensorEventRecord, number>(sensor, (x) => {
      return x.Data.SensorType;
    });

    model.smoker = this.convert(smoke, today.getDate());
    model.charger = this.convert(group[1] ?? [], today.getDate());
    model.spray = this.convert(group[3] ?? [], today.getDate());
    return model;
  }

  private convert(datas: IEventRecord[], today: number): number[] {
    let result: number[] = [];
    let group = ArrayTool.groupBy<IEventRecord, number>(datas, (x) => {
      return x.EventTime.getDate();
    });
    for (let i = 0; i < today; i++) {
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
