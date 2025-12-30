import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { SmokeEventRecord } from '../../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { BicycleParkingRecordSmokeTableContentComponent } from '../bicycle-parking-record-smoke-table-content/bicycle-parking-record-smoke-table-content.component';
import { BicycleParkingRecordSmokeTableArgs } from '../bicycle-parking-record-smoke-table-content/bicycle-parking-record-smoke-table-content.model';

@Component({
  selector: 'howell-bicycle-parking-record-smoke-table-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    DateTimeControlComponent,
    SelectDivisionComponent,
    BicycleParkingRecordSmokeTableContentComponent,
  ],
  templateUrl: './bicycle-parking-record-smoke-table-manager.component.html',
  styleUrl: './bicycle-parking-record-smoke-table-manager.component.less',
})
export class BicycleParkingRecordSmokeTableManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<SmokeEventRecord>>();
  @Output() video = new EventEmitter<SmokeEventRecord>();

  constructor() {}

  table = {
    args: new BicycleParkingRecordSmokeTableArgs(),
    load: new EventEmitter<BicycleParkingRecordSmokeTableArgs>(),
  };
  EventType = EventType;

  on = {
    image: (args: PagedArgs<SmokeEventRecord>) => {
      this.image.emit(args);
    },
    video: (args: SmokeEventRecord) => {
      this.video.emit(args);
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
