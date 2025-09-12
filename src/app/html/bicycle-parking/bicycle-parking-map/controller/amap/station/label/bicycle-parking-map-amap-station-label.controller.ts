import { BicycleParkingMapAMapStationLabelInfo } from './bicycle-parking-map-amap-station-label-info.model';

export class BicycleParkingMapAMapStationLabelController {
  constructor(private map: AMap.Map) {
    this.info = this.init();
  }

  private info: AMap.InfoWindow;

  private init() {
    let info = new AMap.InfoWindow({ anchor: 'bottom-center', content: '' });
    return info;
  }

  private html = {
    content: (data: BicycleParkingMapAMapStationLabelInfo) => {
      let none = "style='display:none'";
      return `<div class="bicycle-parking-map-amap-station-label-info">
  <div class="bicycle-parking-map-amap-station-label-info-head">
    ${data.station.Name}
  </div>
  <div class="bicycle-parking-map-amap-station-label-info-division">
  ${this.html.item('howell-icon-neighborhood', data.station.CommunityName)}
  
  ${this.html.item('howell-icon-grid', data.committees?.Name)}


  ${this.html.item('howell-icon-account', data.member?.Name, '责任人：')}
  ${this.html.item('howell-icon-account', data.member?.MobileNo, '联系方式：')}
  
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

  open(
    data: BicycleParkingMapAMapStationLabelInfo,
    position: [number, number]
  ) {
    let content = this.html.content(data);
    this.info.setContent(content);
    this.info.open(this.map, position);
  }

  close() {
    this.info.close();
  }
}
