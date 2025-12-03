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
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { BicycleParkingStationTableContentComponent } from '../bicycle-parking-station-table-content/bicycle-parking-station-table-content.component';
import { GarbageStationTableArgs } from '../bicycle-parking-station-table-content/business/garbage-station-table.model';
import { BicycleParkingStationTableManagerSource } from './bicycle-parking-station-table-manager.source';

@Component({
  selector: 'howell-bicycle-parking-station-table-manager',
  imports: [
    CommonModule,
    FormsModule,
    BicycleParkingStationTableContentComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
  ],
  templateUrl: './bicycle-parking-station-table-manager.component.html',
  styleUrl: './bicycle-parking-station-table-manager.component.less',
  providers: [BicycleParkingStationTableManagerSource],
})
export class BicycleParkingStationTableManagerComponent implements OnChanges {
  @Input() state?: StationState;
  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() details: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(public source: BicycleParkingStationTableManagerSource) {}

  private change = {
    state: (simple: SimpleChange) => {
      if (simple) {
        this.table.args.state = this.state;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.state(changes['state']);
  }

  table = {
    args: new GarbageStationTableArgs(),
    load: new EventEmitter<GarbageStationTableArgs>(),
  };

  on = {
    image: (args: PagedArgs<GarbageStation>) => {
      this.image.emit(args);
    },
    position: (data: GarbageStation) => {
      this.position.emit(data);
    },
    details: (data: GarbageStation) => {
      this.details.emit(data);
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
