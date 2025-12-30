import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SensorType } from '../../../../../../common/enum/sensor/sensor-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { BicycleParkingContainerEventRecordChartPieComponent } from '../bicycle-parking-container-event-record-chart-pie/bicycle-parking-container-event-record-chart-pie.component';
import { BicycleParkingContainerEventRecordChartPieItem } from '../bicycle-parking-container-event-record-chart-pie/bicycle-parking-container-event-record-chart-pie.model';

@Component({
  selector: 'howell-bicycle-parking-container-event-record-chart-pie-container',
  imports: [CommonModule, BicycleParkingContainerEventRecordChartPieComponent],
  templateUrl:
    './bicycle-parking-container-event-record-chart-pie-container.component.html',
  styleUrl:
    './bicycle-parking-container-event-record-chart-pie-container.component.less',
})
export class BicycleParkingContainerEventRecordChartPieContainerComponent {
  @Input() load?: EventEmitter<string>;
  @Input() unit = TimeUnit.Month;
  @Output() smoke = new EventEmitter<void>();
  @Output() sensor = new EventEmitter<number>();
  @Output() thirdpart = new EventEmitter<number>();

  datas: BicycleParkingContainerEventRecordChartPieItem[] = [];

  on = {
    loaded: (datas: BicycleParkingContainerEventRecordChartPieItem[]) => {
      this.datas = datas;
    },
    item: (item: BicycleParkingContainerEventRecordChartPieItem) => {
      switch (item.id) {
        case SensorType.Smoker:
          this.smoke.emit();
          break;
        case SensorType.Charger:
        case SensorType.Spayer:
          this.sensor.emit(item.id);
          break;

        default:
          this.thirdpart.emit(item.id);
          break;
      }
    },
  };
}
