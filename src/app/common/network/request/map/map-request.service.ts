import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { MapDivision } from './map-division.model';
import { MapPoint } from './map-point.model';

@Injectable({
  providedIn: 'root',
})
export class MapRequestService {
  constructor(private http: HttpClient) {}

  division = {
    get: async (id: string) => {
      let url = `/amap/models/villages/${id}.json`;
      let observable = this.http.get<MapDivision>(url);
      let response = await firstValueFrom(observable);
      return plainToInstance(MapDivision, response);
    },
    array: async (ids: string[]) => {
      let datas = [];
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        let item = await this.division.get(id);
        if (item) {
          datas.push(item);
        }
      }
      return datas;
    },
    point: {
      get: async (villageId: string, pointId: string) => {
        let url = `/amap/models/villages/${villageId}/points/${pointId}.json`;
        let observable = this.http.get<MapPoint>(url);
        let response = await firstValueFrom(observable);
        return plainToInstance(MapPoint, response);
      },
      ids: async (villageId: string) => {
        let url = `/amap/models/villages/${villageId}/points.json`;
        let observable = this.http.get<string[]>(url);
        let response = await firstValueFrom(observable);
        return response;
      },
      array: async (villageId: string) => {
        let pointIds = await this.division.point.ids(villageId);
        let datas = [];
        for (let i = 0; i < pointIds.length; i++) {
          const id = pointIds[i];
          let item = await this.division.point.get(villageId, id);
          if (item) {
            datas.push(item);
          }
        }
        return datas;
      },
    },
  };
}
