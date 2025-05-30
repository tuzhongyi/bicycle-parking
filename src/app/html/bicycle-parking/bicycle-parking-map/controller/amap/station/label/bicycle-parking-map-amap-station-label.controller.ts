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

  open(
    data: BicycleParkingMapAMapStationLabelInfo,
    position: [number, number]
  ) {
    let none = "style='display:none'";
    let content = `<div class="bicycle-parking-map-amap-station-label-info">
  <div class="bicycle-parking-map-amap-station-label-info-head">
    ${data.station.Name}
  </div>
  <div class="bicycle-parking-map-amap-station-label-info-division">
    <div class="bicycle-parking-map-amap-station-label-info-division-item" ${
      data.station.CommunityName ? '' : none
    }>
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-icon"
      >
        <i class="howell-icon-neighborhood"></i>
      </div>
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-name"
      >
        ${data.station.CommunityName}
      </div>
    </div>
    <div class="bicycle-parking-map-amap-station-label-info-division-item">
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-icon"
      >
        <i class="howell-icon-grid"></i>
      </div>
      <div
        class="bicycle-parking-map-amap-station-label-info-division-item-name"
         ${data.committees ? '' : none}
      >
        ${data.committees?.Name}
      </div>
    </div>
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
    this.info.setContent(content);
    this.info.open(this.map, position);
  }

  close() {
    this.info.close();
  }
}
