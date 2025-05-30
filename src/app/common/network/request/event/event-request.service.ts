import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { EventInfo } from '../../model/garbage-station/event-info.model';
import { PagedList } from '../../model/page_list.model';
import { EventUrl } from '../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetEventInfosParams } from './event-request.params';
import { RecordsGarbageDropService } from './garbage-drop/event-request-garbage-drop.service';
import { RecordsGarbageFullService } from './garbage-full/event-request-garbage-full.service';
import { RecordsIllegalDropService } from './illegal-drop/event-request-illegal-drop.service';
import { RecordsMixedIntoService } from './mixed-info/event-request-mixed-info.service';
import { RecordSensorService } from './sensor/event-request-sensor.service';
import { RecordsSewageService } from './sewage/event-request-sewage.service';
import { RecordSmokeService } from './smoke/event-request-smoke.service';

@Injectable({
  providedIn: 'root',
})
export class EventRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }

  private basic: HowellBaseRequestService;

  private _info?: InfosService;
  public get info(): InfosService {
    if (!this._info) {
      this._info = new InfosService(this.basic);
    }
    return this._info;
  }

  private _record?: RecordsService;
  public get record(): RecordsService {
    if (!this._record) {
      this._record = new RecordsService(this.basic);
    }
    return this._record;
  }
}

class InfosService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(EventInfo);
  }

  type: HowellBaseTypeRequestService<EventInfo>;

  list(params: GetEventInfosParams): Promise<PagedList<EventInfo>> {
    let url = EventUrl.info.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(type: number): Promise<EventInfo> {
    let url = EventUrl.info.item(type);
    return this.type.get(url);
  }
  update(data: EventInfo): Promise<EventInfo> {
    let url = EventUrl.info.item(data.Type);
    return this.type.put(url, data);
  }
}

class RecordsService {
  constructor(private basic: HowellBaseRequestService) {}

  private _IllegalDrop?: RecordsIllegalDropService;
  public get IllegalDrop(): RecordsIllegalDropService {
    if (!this._IllegalDrop) {
      this._IllegalDrop = new RecordsIllegalDropService(this.basic);
    }
    return this._IllegalDrop;
  }

  private _MixedInto?: RecordsMixedIntoService;
  public get MixedInto(): RecordsMixedIntoService {
    if (!this._MixedInto) {
      this._MixedInto = new RecordsMixedIntoService(this.basic);
    }
    return this._MixedInto;
  }

  private _GarbageFull?: RecordsGarbageFullService;
  public get GarbageFull(): RecordsGarbageFullService {
    if (!this._GarbageFull) {
      this._GarbageFull = new RecordsGarbageFullService(this.basic);
    }
    return this._GarbageFull;
  }

  private _GarbageDrop?: RecordsGarbageDropService;
  public get GarbageDrop(): RecordsGarbageDropService {
    if (!this._GarbageDrop) {
      this._GarbageDrop = new RecordsGarbageDropService(this.basic);
    }
    return this._GarbageDrop;
  }

  private _sewage?: RecordsSewageService;
  public get sewage(): RecordsSewageService {
    if (!this._sewage) {
      this._sewage = new RecordsSewageService(this.basic);
    }
    return this._sewage;
  }
  private _sensor?: RecordSensorService;
  public get sensor(): RecordSensorService {
    if (!this._sensor) {
      this._sensor = new RecordSensorService(this.basic);
    }
    return this._sensor;
  }
  private _smoke?: RecordSmokeService;
  public get smoke(): RecordSmokeService {
    if (!this._smoke) {
      this._smoke = new RecordSmokeService(this.basic);
    }
    return this._smoke;
  }
}
