import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from '../../../common/enum/event-type.enum';
import { StationState } from '../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../common/network/model/garbage-station/garbage-station.model';
import { MapDivision } from '../../../common/network/request/map/map-division.model';
import { MQTTEventService } from '../../../common/network/request/mqtt-event/mqtt-event.service';
import { Flags } from '../../../common/tools/flags';
import { BicycleParkingMapProviders } from './bicycle-parking-map.provider';
import { BicycleParkingMapBusiness } from './business/bicycle-parking-map.business';
import { BicycleParkingMapController } from './controller/bicycle-parking-map.controller';

@Component({
  selector: 'howell-bicycle-parking-map',
  imports: [],
  templateUrl: './bicycle-parking-map.component.html',
  styleUrl: './bicycle-parking-map.component.less',
  providers: [...BicycleParkingMapProviders],
})
export class BicycleParkingMapComponent implements OnInit, OnDestroy {
  @Input() select?: EventEmitter<string>;
  @Output() loaded = new EventEmitter<GarbageStation[]>();
  @Output() selected = new EventEmitter<GarbageStation>();

  constructor(
    public controller: BicycleParkingMapController,
    private business: BicycleParkingMapBusiness,
    private mqtt: MQTTEventService
  ) {}

  private subscription = new Subscription();
  data = {
    division: [] as MapDivision[],
    station: [] as GarbageStation[],
  };

  ngOnInit(): void {
    this.regist();
    this.load.division();
    this.load.station();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this.select) {
      let sub = this.select.subscribe((id) => {
        this.business.map.get(id).then((division) => {
          if (division) {
            this.controller.select(division);
          }
          let datas = this.data.station.filter((x) => {
            return x.DivisionId === id;
          });
          this.loaded.emit(datas);
        });
      });
      this.subscription.add(sub);
    }
    this.controller.event.dblclick.subscribe((station) => {
      this.selected.emit(station);
    });
    this.mqtt.listenerStationEvent(undefined, EventType.Smoke);
    this.mqtt.pushService.pushEvent.subscribe((x) => {
      this.load.station();
    });
  }

  load = {
    division: () => {
      this.business.map.current().then((x) => {
        if (x) {
          this.data.division.push(x);
          this.controller.load.root(x);
          this.controller.move([x.center.lon, x.center.lat]);
        }
      });

      this.business.map.children().then((datas) => {
        if (datas) {
          this.data.division.push(...datas);
          this.controller.load.division(datas);
        }
      });
    },
    station: () => {
      this.controller.alarm.stop();
      this.business.station.load().then((datas) => {
        this.data.station = [...datas];
        this.controller.load.station(datas);
        let alarms = this.data.station.filter((x) => {
          let flags = new Flags(x.StationState);
          return flags.contains(StationState.Smoke);
        });
        if (alarms.length > 0) {
          this.controller.alarm.start(alarms);
        }
        this.loaded.emit(this.data.station);
      });
      let get = (stationId: string) => {
        return this.business.station.info(stationId);
      };
      this.controller.regist(get);
    },
  };
}
