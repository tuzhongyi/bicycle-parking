import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SensorType } from '../../../../common/enum/sensor/sensor-type.enum';
import { Camera } from '../../../../common/network/model/garbage-station/camera.model';
import { Sensor } from '../../../../common/network/model/garbage-station/sensor/sensor.model';
import { ArrayTool } from '../../../../common/tools/array-tool/array.tool';

@Component({
  selector: 'howell-bicycle-parking-details-info-content',
  imports: [CommonModule],
  templateUrl: './bicycle-parking-details-info-content.component.html',
  styleUrl: './bicycle-parking-details-info-content.component.less',
})
export class BicycleParkingDetailsInfoContentComponent implements OnChanges {
  @Input() cameras?: Camera[] = [];
  @Input('sensors') _sensors: Sensor[] = [];
  @Input() type?: string;

  constructor() {}

  sensors?: Record<string, Sensor[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_sensors'] && changes['_sensors'].currentValue) {
      this.load(changes['_sensors'].currentValue);
    }
  }

  load(datas: Sensor[]) {
    this.sensors = ArrayTool.groupBy(datas, (x) => {
      switch (x.SensorType) {
        case SensorType.Charger:
          return 'charger';
        case SensorType.Spayer:
          return 'spayer';
        case SensorType.Smoker:
          return 'smoke';
        default:
          return 'other';
      }
    });
    console.log(this.sensors);
  }
}
