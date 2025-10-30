import { EventEmitter } from '@angular/core';
import { StationState } from '../../../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../../../common/tools/flags';
import { BicycleParkingMapAMapStationLabelInfoController } from './bicycle-parking-map-amap-station-label-info.controller';
import { BicycleParkingMapAMapStationLabelInfo } from './bicycle-parking-map-amap-station-label-info.model';

export class BicycleParkingMapAMapStationLabelController {
  event = {
    over: new EventEmitter<void>(),
    out: new EventEmitter<void>(),
    disalarm: new EventEmitter<GarbageStation>(),
  };
  constructor(private map: AMap.Map) {
    this.info = this.init();
  }
  private html = new BicycleParkingMapAMapStationLabelInfoController();
  private info: AMap.InfoWindow;

  private init() {
    let info = new AMap.InfoWindow({ anchor: 'bottom-center', content: '' });
    info.on('mouseover', () => {
      this.event.over.emit();
    });
    info.on('mouseout', () => {
      this.event.out.emit();
    });
    this.html.event.disalarm.subscribe((x) => {
      this.event.disalarm.emit(x);
      console.log('disalarm ', x);
    });
    return info;
  }

  open(
    data: BicycleParkingMapAMapStationLabelInfo,
    position: [number, number]
  ) {
    // let content = this.html.content(data);
    let content = this.html.load(data);
    this.info.setContent(content);
    this.info.open(this.map, position);
  }

  private handle?: NodeJS.Timeout;

  close = {
    do: (timeout = 200) => {
      this.handle = setTimeout(() => {
        this.info.close();
        this.handle = undefined;
      }, timeout);
    },
    stop: () => {
      if (this.handle) {
        clearTimeout(this.handle);
        this.handle = undefined;
      }
    },
  };

  private _html = {
    operation: (station: GarbageStation) => {
      let flags: Flags<StationState>;
      if (typeof station.StationState == 'number') {
        flags = new Flags(station.StationState);
      } else {
        flags = station.StationState;
      }

      if (flags.contains(StationState.Smoke)) {
      }

      return '';
    },
    content: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let none = "style='display:none'";
      return `<div class="bicycle-parking-map-amap-station-label-info">
  <div class="bicycle-parking-map-amap-station-label-info-head">
    <div class="bicycle-parking-map-amap-station-label-info-head-title">${
      data.station.Name
    }</div>
    <div class="bicycle-parking-map-amap-station-label-info-head-operation">
      ${this._html.operation(data.station)}
    </div>
  </div>
  <div class="bicycle-parking-map-amap-station-label-info-division">
  ${this._html.item('howell-icon-neighborhood', data.station.CommunityName)}
  
  ${this._html.item('howell-icon-grid', data.committees?.Name)}


  ${this._html.item('howell-icon-account', data.member?.Name, '责任人：')}
  ${this._html.item('howell-icon-account', data.member?.MobileNo, '联系方式：')}
  
  </div>
  <div class="bicycle-parking-map-amap-station-label-info-line"></div>
  <div class="bicycle-parking-map-amap-station-label-info-device">
    <div class="bicycle-parking-map-amap-station-label-info-device-item">
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-icon charger"
      ></div>
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-value"
      >
        <div>
          ${
            (data.statistic.ChargerNumber ?? 0) -
            (data.statistic.OfflineChargerNumber ?? 0)
          }
        </div>
        <div
          class="bicycle-parking-map-amap-station-label-info-device-item-value-count"
        >
          /${data.statistic.ChargerNumber ?? 0}
        </div>
      </div>
    </div>
    <div class="bicycle-parking-map-amap-station-label-info-device-item">
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-icon smoker"
      ></div>
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-value"
      >
        <div>
          ${
            (data.statistic.SmokerNumber ?? 0) -
            (data.statistic.OfflineSmokerNumber ?? 0)
          }
        </div>
        <div
          class="bicycle-parking-map-amap-station-label-info-device-item-value-count"
        >
          /${data.statistic.SmokerNumber ?? 0}
        </div>
      </div>
    </div>
    <div class="bicycle-parking-map-amap-station-label-info-device-item">
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-icon camera"
      ></div>
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-value"
      >
        <div>
          ${
            (data.statistic.CameraNumber ?? 0) -
            (data.statistic.OfflineCameraNumber ?? 0)
          }
        </div>
        <div
          class="bicycle-parking-map-amap-station-label-info-device-item-value-count"
        >
          /${data.statistic.CameraNumber ?? 0}
        </div>
      </div>
    </div>
    <div class="bicycle-parking-map-amap-station-label-info-device-item">
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-icon spayer"
      ></div>
      <div
        class="bicycle-parking-map-amap-station-label-info-device-item-value"
      >
        <div>
          ${
            (data.statistic.SpayerNumber ?? 0) -
            (data.statistic.OfflineSpayerNumber ?? 0)
          }
        </div>
        <div
          class="bicycle-parking-map-amap-station-label-info-device-item-value-count"
        >
          /${data.statistic.SpayerNumber ?? 0}
        </div>
      </div>
    </div>
  </div>
</div>
`;
    },
    item: (icon: string, content?: string, key?: string) => {
      let none = "style='display:none'";
      return `<div class="bicycle-parking-map-amap-station-label-info-division-item" ${
        content ? '' : none
      }>
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-icon"
      >
        <i class="${icon}"></i>
      </div>
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-name"
      >${key ? `<div class="item-title">${key}</div>` : ''}
        ${content}
      </div>
    </div>`;
    },
  };
}
