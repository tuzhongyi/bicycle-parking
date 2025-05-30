import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathTool } from '../../../tools/path-tool/path.tool';

@Injectable({
  providedIn: 'root',
})
export class ConfigRequestService {
  constructor(private http: HttpClient) {}

  mqtt() {
    return this.http.get<{ Port: number; Username: string; Password: string }>(
      PathTool.config.mqtt
    );
  }
}
