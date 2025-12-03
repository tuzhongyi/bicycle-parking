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
  @Input() selectdivision?: EventEmitter<string>;
  @Output() loaded = new EventEmitter<GarbageStation[]>();
  @Output() selected = new EventEmitter<GarbageStation>();
  @Input('load') _load?: EventEmitter<void>;
  @Input() selectstation?: EventEmitter<GarbageStation>;

  constructor(
    public controller: BicycleParkingMapController,
    private business: BicycleParkingMapBusiness,
    private mqtt: MQTTEventService
  ) {}

  private subscription = new Subscription();
  data = {
    station: [] as GarbageStation[],
  };

  ngOnInit(): void {
    this.regist();
    this.load.division();
    // this.load.community();
    this.load.station();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this.selectdivision) {
      let sub = this.selectdivision.subscribe((id) => {
        this.business.map.divisions().then((divisions) => {
          let division = divisions.find((x) => x.id == id);
          if (division) {
            this.controller.select.division(division);
            let stations = this.data.station.filter((x) => {
              return x.DivisionId === division.id;
            });
            this.loaded.emit(stations);
          } else {
            this.controller.blur();
            this.loaded.emit(this.data.station);
          }
        });
      });
      this.subscription.add(sub);
    }
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load.station();
      });
      this.subscription.add(sub);
    }
    if (this.selectstation) {
      let sub = this.selectstation.subscribe((data) => {
        if (data.GisPoint) {
          let position: [number, number] = [
            data.GisPoint.Longitude,
            data.GisPoint.Latitude,
          ];
          this.business.station.info(data.Id).then((info) => {
            this.controller.select.station(info, position);
          });
        }
      });
      this.subscription.add(sub);
    }
    this.controller.event.dblclick.subscribe((station) => {
      this.selected.emit(station);
    });
    this.controller.event.disalarm.subscribe((station) => {
      this.business.station.reset(station).then((x) => {
        this.controller.info.close(0);
        this.load.station();
      });
    });
    this.mqtt.listenerStationEvent(undefined, EventType.Smoke);
    this.mqtt.pushService.pushEvent.subscribe((x) => {
      this.load.station();
    });
  }

  load = {
    division: () => {
      this.business.map.root().then((x) => {
        if (x) {
          this.controller.load.root(x);
          this.controller.move([x.center.lon, x.center.lat]);
        }
      });

      this.business.map.divisions().then((datas) => {
        if (datas) {
          this.controller.load.division(datas);
        }
      });
    },
    station: () => {
      this.business.station.load().then((datas) => {
        this.data.station = [...datas];
        this.controller.load.station(datas);
        let alarms = this.data.station.filter((x) => {
          let flags = new Flags(x.StationState);
          return flags.contains(StationState.Smoke);
        });
        if (alarms.length > 0) {
          this.controller.alarm.start(alarms);
        } else {
          this.controller.alarm.stop();
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
