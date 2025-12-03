import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { Page } from '../../../../../common/network/model/page_list.model';
import { BicycleParkingContainerComponent } from '../bicycle-parking-container.component';

export class BicycleParkingContainerStationTableWindow extends WindowViewModel {
  constructor(private that: BicycleParkingContainerComponent) {
    super();
  }
  style: any = {
    width: '100%',
    height: 'calc(100% - 85px)',
    position: 'absolute',
    top: '85px',
    left: '0',
    transform: 'none',
    border: 'none',
    boxShadow: 'none',
  };
  state?: StationState;
  title = '车棚';

  private get window() {
    return this.that.window;
  }

  on = {
    image: (data: PagedArgs<GarbageStation>) => {
      let station = data.data;
      if (station.Cameras) {
        this.window.picture.datas = station.Cameras.map(
          (camera) => camera.ImageUrl ?? ''
        );
        this.window.picture.title = data.data.Name;
        this.window.picture.page = Page.create(
          data.page.PageIndex,
          station.Cameras.length
        );
        this.window.picture.show = true;
      }
    },
    details: (data: GarbageStation) => {
      this.window.station.details.data = data;
      this.window.station.details.title = data.Name;
      this.window.station.details.show = true;
    },
    position: (data: GarbageStation) => {
      this.that.map.select.emit(data);
      this.show = false;
    },
  };
}
