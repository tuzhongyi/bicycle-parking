import { EventEmitter } from '@angular/core';
import { StationState } from '../../../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../../../common/tools/flags';
import { BicycleParkingMapAMapStationLabelInfo } from './bicycle-parking-map-amap-station-label-info.model';

export class BicycleParkingMapAMapStationLabelInfoController {
  event = {
    disalarm: new EventEmitter<GarbageStation>(),
  };
  constructor() {
    this.regist();
  }
  load(data: BicycleParkingMapAMapStationLabelInfo) {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info';

    let head = this.head.load(data);

    div.appendChild(head);

    let body = this.body.load(data);
    body.forEach((x) => {
      div.appendChild(x);
    });

    return div;
  }

  private regist() {
    this.head.event.disalarm.subscribe((x) => {
      this.event.disalarm.emit(x);
    });
  }

  private head = new HeadController();
  private body = new BodyController();
}

class HeadController {
  event = {
    disalarm: new EventEmitter<GarbageStation>(),
  };
  load(data: BicycleParkingMapAMapStationLabelInfo): HTMLElement {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info-head';

    let title = this.title(data);
    div.appendChild(title);

    let operation = this.operation(data);
    div.appendChild(operation);

    return div;
  }

  private title(data: BicycleParkingMapAMapStationLabelInfo) {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info-head-title';
    div.innerText = data.station.Name;
    return div;
  }
  private operation(data: BicycleParkingMapAMapStationLabelInfo) {
    let div = document.createElement('div');
    div.className =
      'bicycle-parking-map-amap-station-label-info-head-operation';

    let disalarm = document.createElement('div');
    disalarm.className = 'button';
    disalarm.innerText = '解除报警';
    disalarm.addEventListener('click', (e) => {
      this.event.disalarm.emit(data.station);
    });
    let flags: Flags<StationState>;
    if (typeof data.station.StationState == 'number') {
      flags = new Flags(data.station.StationState);
    } else {
      flags = data.station.StationState;
    }
    if (!flags.contains(StationState.Smoke)) {
      disalarm.style.display = 'none';
    }

    div.appendChild(disalarm);

    return div;
  }
}
class BodyController {
  load(data: BicycleParkingMapAMapStationLabelInfo): HTMLElement[] {
    let division = this.division.load(data);
    let line = this.line;
    let device = this.device.load(data);

    return [division, line, device];
  }

  private division = new BodyDivisionController();
  private device = new BodyDeviceController();

  get line() {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info-body-line';
    return div;
  }
}
class BodyDivisionController {
  load(data: BicycleParkingMapAMapStationLabelInfo) {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info-division';

    let community = this.item.load(
      'howell-icon-neighborhood',
      data.station.CommunityName
    );
    div.appendChild(community);

    let committees = this.item.load('howell-icon-grid', data.committees?.Name);
    div.appendChild(committees);

    let membername = this.item.load(
      'howell-icon-account',
      data.member?.Name,
      '责任人：'
    );
    div.appendChild(membername);

    let membermobileno = this.item.load(
      'howell-icon-account',
      data.member?.MobileNo,
      '联系方式：'
    );
    div.appendChild(membermobileno);

    return div;
  }

  private item = {
    load: (icon: string, content?: string, key?: string) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-division-item';

      let _icon = this.item.icon(icon);
      div.appendChild(_icon);

      let _key = this.item.key(content ?? '', key);
      div.appendChild(_key);

      return div;
    },
    icon: (icon: string) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-division-item-icon';
      let i = document.createElement('i');
      i.className = icon;
      div.appendChild(i);
      return div;
    },
    key: (content: string, key?: string) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-division-item-name';
      if (key) {
        let title = document.createElement('div');
        title.className = 'item-title';
        title.innerText = key;
        div.appendChild(title);
      }
      div.appendChild(document.createTextNode(content));
      return div;
    },
  };
}
class BodyDeviceController {
  load(data: BicycleParkingMapAMapStationLabelInfo) {
    let div = document.createElement('div');
    div.className = 'bicycle-parking-map-amap-station-label-info-device';

    let charger = this.charger.load(data);
    div.appendChild(charger);

    let smoker = this.smoker.load(data);
    div.appendChild(smoker);

    let camera = this.camera.load(data);
    div.appendChild(camera);

    let spayer = this.spayer.load(data);
    div.appendChild(spayer);

    return div;
  }

  private charger = {
    load: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className = 'bicycle-parking-map-amap-station-label-info-device-item';

      let icon = this.item.icon('charger');
      div.appendChild(icon);

      let value = this.item.value();
      value.appendChild(this.charger.value(data));
      value.appendChild(this.charger.count(data));
      div.appendChild(value);

      return div;
    },
    value: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.innerText = `${
        (data.statistic.ChargerNumber ?? 0) -
        (data.statistic.OfflineChargerNumber ?? 0)
      }`;
      return div;
    },
    count: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-device-item-value-count';
      div.innerText = `/${data.statistic.ChargerNumber ?? 0}`;
      return div;
    },
  };

  private smoker = {
    load: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className = 'bicycle-parking-map-amap-station-label-info-device-item';

      let icon = this.item.icon('smoker');
      div.appendChild(icon);

      let value = this.item.value();
      value.appendChild(this.smoker.value(data));
      value.appendChild(this.smoker.count(data));
      div.appendChild(value);

      return div;
    },
    value: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.innerText = `${
        (data.statistic.SmokerNumber ?? 0) -
        (data.statistic.OfflineSmokerNumber ?? 0)
      }`;
      return div;
    },
    count: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-device-item-value-count';
      div.innerText = `/${data.statistic.SmokerNumber ?? 0}`;
      return div;
    },
  };

  private camera = {
    load: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className = 'bicycle-parking-map-amap-station-label-info-device-item';

      let icon = this.item.icon('camera');
      div.appendChild(icon);

      let value = this.item.value();
      value.appendChild(this.camera.value(data));
      value.appendChild(this.camera.count(data));
      div.appendChild(value);

      return div;
    },
    value: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.innerText = `${
        (data.statistic.CameraNumber ?? 0) -
        (data.statistic.OfflineCameraNumber ?? 0)
      }`;
      return div;
    },
    count: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-device-item-value-count';
      div.innerText = `/${data.statistic.CameraNumber ?? 0}`;
      return div;
    },
  };

  private spayer = {
    load: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className = 'bicycle-parking-map-amap-station-label-info-device-item';

      let icon = this.item.icon('spayer');
      div.appendChild(icon);

      let value = this.item.value();
      value.appendChild(this.spayer.value(data));
      value.appendChild(this.spayer.count(data));
      div.appendChild(value);

      return div;
    },
    value: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.innerText = `${
        (data.statistic.SpayerNumber ?? 0) -
        (data.statistic.OfflineSpayerNumber ?? 0)
      }`;
      return div;
    },
    count: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-device-item-value-count';
      div.innerText = `/${data.statistic.SpayerNumber ?? 0}`;
      return div;
    },
  };

  private item = {
    icon: (key: string) => {
      let div = document.createElement('div');
      div.className = `bicycle-parking-map-amap-station-label-info-device-item-icon ${key}`;
      return div;
    },
    value: () => {
      let div = document.createElement('div');
      div.className =
        'bicycle-parking-map-amap-station-label-info-device-item-value';
      return div;
    },
  };
}
