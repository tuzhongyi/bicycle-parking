import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { SensorEventRecord } from '../../../../../common/network/model/garbage-station/event-record/sensor/sensor-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { BicycleParkingRecordSensorTableContentComponent } from '../bicycle-parking-record-sensor-table-content/bicycle-parking-record-sensor-table-content.component';
import { BicycleParkingRecordSensorTableArgs } from '../bicycle-parking-record-sensor-table-content/bicycle-parking-record-sensor-table-content.model';

@Component({
  selector: 'howell-bicycle-parking-record-sensor-table-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    DateTimeControlComponent,
    SelectDivisionComponent,
    BicycleParkingRecordSensorTableContentComponent,
  ],
  templateUrl: './bicycle-parking-record-sensor-table-manager.component.html',
  styleUrl: './bicycle-parking-record-sensor-table-manager.component.less',
})
export class BicycleParkingRecordSensorTableManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<SensorEventRecord>>();
  @Output() video = new EventEmitter<SensorEventRecord>();

  constructor() {}

  table = {
    args: new BicycleParkingRecordSensorTableArgs(),
    load: new EventEmitter<BicycleParkingRecordSensorTableArgs>(),
  };
  EventType = EventType;

  on = {
    image: (args: PagedArgs<SensorEventRecord>) => {
      this.image.emit(args);
    },
    video: (args: SensorEventRecord) => {
      this.video.emit(args);
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
