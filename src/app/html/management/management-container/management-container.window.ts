import { WindowViewModel } from '../../../common/components/window/window.model';
import { Page } from '../../../common/network/model/page_list.model';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../bicycle-parking/bicycle-parking-video/component/bicycle-parking-video.model';

export class ManagementContainerWindow {
  picture = new PictureWindow();
  video = new VideoWindow();
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
