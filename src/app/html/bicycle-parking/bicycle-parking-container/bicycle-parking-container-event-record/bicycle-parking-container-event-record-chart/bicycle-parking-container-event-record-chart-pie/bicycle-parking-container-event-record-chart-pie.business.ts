import { Injectable } from '@angular/core';
import { SensorType } from '../../../../../../common/enum/sensor/sensor-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { TPPEventTypeDescriptor } from '../../../../../../common/network/model/third-part/tpp-event-type-descriptor.model';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartPieItem } from './bicycle-parking-container-event-record-chart-pie.model';

@Injectable()
export class BicycleParkingContainerEventRecordChartPieBusiness {
  constructor(private service: BicycleParkingContainerEventRecordService) {}

  async load(divisionId: string, unit: TimeUnit) {
    let duration = DateTimeTool.TimeUnit(unit, new Date());

    let items = await this.loading.sensor(divisionId, duration);
    let third = await this.loading.thirdpart(divisionId, duration);

    items = items.concat(third);

    return items;
  }

  private loading = {
    sensor: async (divisionId: string, duration: Duration) => {
      let smoke = await this.service.smoke.load(divisionId, duration);
      let sensor = await this.service.sensor.load(divisionId, duration);
      let charger = this.convert.charger();
      let smoker = this.convert.smoker(smoke.length);
      let spray = this.convert.spray();

      sensor.forEach((x) => {
        switch (x.Data.SensorType) {
          case 1:
            charger.value++;
            break;
          case 2:
            smoker.value++;
            break;
          case 3:
            spray.value++;
            break;

          default:
            break;
        }
      });

      let items = [smoker, charger, spray];
      return items;
    },
    thirdpart: async (divisionId: string, duration: Duration) => {
      let types = await this.service.thirdpart.types();
      if (types.length == 0) {
        return [];
      }
      let index = types.findIndex((x) => x.EventType == 13);
      if (index >= 0) {
        types.splice(index, 1);
      }
      let third = await this.service.thirdpart.load(
        divisionId,
        duration,
        types.map((x) => x.EventType)
      );

      const map = new Map<
        number,
        BicycleParkingContainerEventRecordChartPieItem
      >();

      let i = 0;
      for (const t of types) {
        map.set(t.EventType, {
          id: t.EventType,
          color: ColorTool.get.index(i + 5, 10),
          name: t.EventName,
          value: 0,
        });
        i++;
      }

      // 2. 汇总数量
      for (const n of third) {
        const item = map.get(n.EventType);
        if (!item) continue;

        item.value += n.DayNumber;
      }

      // 3. 返回结果
      return Array.from(map.values());
    },
  };

  private convert = {
    charger: (value = 0) => {
      let item: BicycleParkingContainerEventRecordChartPieItem = {
        id: SensorType.Charger,
        color: ColorTool.warning.charger,
        name: '充电桩预警',
        value: value,
      };
      return item;
    },
    smoker: (value = 0) => {
      let item: BicycleParkingContainerEventRecordChartPieItem = {
        id: SensorType.Smoker,
        color: ColorTool.warning.smoker,
        name: '火灾预警',
        value: value,
      };
      return item;
    },
    spray: (value = 0) => {
      let item: BicycleParkingContainerEventRecordChartPieItem = {
        id: SensorType.Spayer,
        color: ColorTool.warning.spray,
        name: '消防喷淋预警',
        value: value,
      };
      return item;
    },
    thirdpart: (types: TPPEventTypeDescriptor[]) => {
      let items = types.map<BicycleParkingContainerEventRecordChartPieItem>(
        (x, i) => {
          return {
            id: x.EventType,
            color: ColorTool.get.index(i + 5, 10),
            name: x.EventName,
            value: 0,
          };
        }
      );
      return items;
    },
  };
}
