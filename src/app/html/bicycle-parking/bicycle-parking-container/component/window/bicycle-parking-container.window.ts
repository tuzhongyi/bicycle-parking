import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { Page } from '../../../../../common/network/model/page_list.model';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../bicycle-parking-video/component/bicycle-parking-video.model';

export class BicycleParkingContainerWindow {
  picture = new PictureWindow();
  video = new VideoWindow();
  details = new DetailsWindow();
}

class PictureWindow extends WindowViewModel {
  style = {
    height: '70%',
    width: 'auto',
    aspectRatio: '1920/1130',
    top: '48%',
  };
  index = 0;
  datas: string[] = [];
  page?: Page;
  title = '';
}
class VideoWindow extends WindowViewModel {
  style = {
    height: '70%',
    width: 'auto',
    aspectRatio: '1920/1130',
    top: '48%',
  };
  args: {
    preview?: VideoPreviewArgs;
    playback?: VideoPlaybackArgs;
  } = {};
  title = '';

  clear() {
    this.title = '';
    this.args = {};
  }
}
class DetailsWindow extends WindowViewModel {
  constructor() {
    super();

    if (screen.width / screen.height < 2) {
      this.style.width = '85%';
    }
  }
  style: any = {};
  data?: GarbageStation;
  title = '';
}
