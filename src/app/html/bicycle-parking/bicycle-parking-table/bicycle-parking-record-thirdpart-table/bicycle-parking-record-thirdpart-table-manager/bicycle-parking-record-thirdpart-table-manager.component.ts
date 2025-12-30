import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { ThirdPartEventRecord } from '../../../../../common/network/model/third-part/tpp-event-record.model';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { BicycleParkingRecordThirdPartTableContentComponent } from '../bicycle-parking-record-thirdpart-table-content/bicycle-parking-record-thirdpart-table-content.component';
import { BicycleParkingRecordThirdPartTableArgs } from '../bicycle-parking-record-thirdpart-table-content/bicycle-parking-record-thirdpart-table-content.model';
import { BicycleParkingRecordThirdPartTableManagerSource } from './bicycle-parking-record-thirdpart-table-manager.source';

@Component({
  selector: 'howell-bicycle-parking-record-thirdpart-table-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    DateTimeControlComponent,
    SelectDivisionComponent,
    BicycleParkingRecordThirdPartTableContentComponent,
  ],
  templateUrl:
    './bicycle-parking-record-thirdpart-table-manager.component.html',
  styleUrl: './bicycle-parking-record-thirdpart-table-manager.component.less',
  providers: [BicycleParkingRecordThirdPartTableManagerSource],
})
export class BicycleParkingRecordThirdPartTableManagerComponent
  implements OnChanges
{
  @Input() args?: BicycleParkingRecordThirdPartTableArgs;
  @Output() image = new EventEmitter<PagedArgs<ThirdPartEventRecord>>();
  @Output() video = new EventEmitter<ThirdPartEventRecord>();

  constructor(public source: BicycleParkingRecordThirdPartTableManagerSource) {}

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        if (this.args) {
          this.table.args.type = this.args.type;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  table = {
    args: new BicycleParkingRecordThirdPartTableArgs(),
    load: new EventEmitter<BicycleParkingRecordThirdPartTableArgs>(),
  };
  EventType = EventType;

  on = {
    image: (args: PagedArgs<ThirdPartEventRecord>) => {
      this.image.emit(args);
    },
    video: (args: ThirdPartEventRecord) => {
      this.video.emit(args);
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
