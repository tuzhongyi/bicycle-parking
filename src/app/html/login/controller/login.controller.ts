import { Injectable } from '@angular/core';
import { Base64 } from '../../../common/imports/base64/base64';
import { AuthorizationStore } from '../../../common/network/request/auth/authorization.store';
import { DivisionRequestService } from '../../../common/network/request/division/division-request.service';
import { GarbageStationRequestService } from '../../../common/network/request/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../common/storage/global.storage';
import { LocalStorageService } from '../../../common/storage/local.storage';
import { SessionStorageService } from '../../../common/storage/session-storage.service';
import { LoginConfigController } from './login-config.controller';

@Injectable()
export class LoginController {
  constructor(
    public config: LoginConfigController,
    public store: AuthorizationStore,
    private session: SessionStorageService,
    private local: LocalStorageService,
    private global: GlobalStorageService,
    private division: DivisionRequestService,
    private station: GarbageStationRequestService
  ) {}
  init() {
    this.session.clear();
    this.local.clear();
    this.global.destroy();
    this.division.cache.clear();
    this.station.cache.clear();
    this.division.statistic.number.cache.clear();
    this.station.statistic.number.cache.clear();
  }
  save(username: string, password: string) {
    let value = `${username}&${password}`;

    let base64 = Base64.encode(value);
    let code = encodeURIComponent(base64);
    this.local.auth = code;
  }
}
export const LoginControllerProvider = [LoginConfigController, LoginController];
