import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';

import { firstValueFrom } from 'rxjs';
import { RoutePath } from '../../../../html/app-routing.path';
import { Base64 } from '../../../imports/base64/base64';
import { GlobalStorageService } from '../../../storage/global.storage';
import { LocalStorageService } from '../../../storage/local.storage';
import { SessionStorageService } from '../../../storage/session-storage.service';
import { User } from '../../model/garbage-station/user.model';
import { UserUrl } from '../../url/garbage/user.url';
import { AuthorizationStore } from './authorization.store';
import { DigestResponse } from './digest-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private local: LocalStorageService,
    private session: SessionStorageService,
    private router: Router,
    private global: GlobalStorageService,
    private http: HttpClient,
    private store: AuthorizationStore
  ) {
    this.init();
  }

  private init() {
    let username = localStorage.getItem('username');
    if (username) {
      username = atob(username);
      let res = username.match(
        /[a-zA-Z0-9+/=]{32}(?<username>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      username = res.groups!['username'];

      this.session.username = username;
    }
    let password = localStorage.getItem('password');
    if (password) {
      password = atob(password);

      if (password && password.length > 64) {
        password = password.substring(32, password.length);
        password = password.substring(0, password.length - 32);
      }

      // let res2 = password.match(
      //   /[a-zA-Z0-9+/=]{32}(?<password>(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,30})[a-zA-Z0-9+/=]{32}/
      // )!;
      // password = res2.groups!['password'];

      this.session.password = password;
    }
  }

  toroute(user: User) {
    let path = this.getPath(user);
    return this.router.parseUrl(`/${path}`);
  }

  getPath(user: User): string {
    return `${RoutePath.bicycle_parking}/${RoutePath.management}`;
  }

  login(url: string): Promise<User>;
  login(username: string, password: string): Promise<User>;
  login(username: string, password?: string): Promise<User> {
    // this.session.clear();
    // this.local.clear();
    // this.global.destroy();
    // this.service.clear();
    if (password) {
      return this.loginByusername(username, password);
    } else {
      return this.loginByUrl(username);
    }
  }
  private async loginByusername(username: string, password: string) {
    this.session.username = username;
    this.session.password = password;

    let url = UserUrl.login(username);
    let headers = new HttpHeaders({
      'X-Webbrowser-Authentication': 'Forbidden',
    });
    return new Promise<User>((resolve, reject) => {
      firstValueFrom(this.http.get(url, { headers: headers })).catch(
        (error: HttpErrorResponse) => {
          if (error.status == 403) {
            let authenticateHeader =
              error.headers.get('www-authenticate') ?? '';
            let challenge = DigestResponse.parse(authenticateHeader);
            this.session.challenge = challenge;
            let authorization = challenge.ToString(
              'GET',
              url,
              username,
              password,
              this.session.nc
            );
            headers = headers.append('Authorization', authorization);
            firstValueFrom(this.http.get<User>(url, { headers: headers }))
              .then((x) => {
                let result = plainToInstance(User, x);
                this.store.save.info(result, username, password);
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      );
    });
  }

  private loginByUrl(url: string): Promise<User> {
    let _url = new URL(url);
    let index = url.indexOf('?');
    if (index > 0) {
      try {
        let auto = false;
        _url.searchParams.forEach((value, key) => {
          let lower = key.toLocaleLowerCase();

          switch (lower) {
            case 'auth':
              this.clear();
              let code = decodeURIComponent(value);
              let urlParam = Base64.decode(code);
              let paramSplit = urlParam.split('&');
              this.session.username = paramSplit[0];
              this.session.password = paramSplit[1];
              auto = true;
              break;
            case 'hidetitlebar':
              this.global.HideTitlebar = JSON.parse(value);
              break;
            case 'hidebutton':
              this.global.HideButton = JSON.parse(value);
              break;
            default:
              break;
          }
        });
        if (auto) {
          //this.sessionUser.clear();
        }
      } catch (error) {
        console.error('login by url: query is null');
        throw error;
      }
    }
    return this.login(this.session.username, this.session.password);
  }

  clear() {
    this.session.clear();
    this.local.clear();
    this.global.destroy();
  }
}
