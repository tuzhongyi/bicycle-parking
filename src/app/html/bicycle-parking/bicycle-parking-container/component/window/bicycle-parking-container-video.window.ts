import { WindowViewModel } from '../../../../../common/components/window/window.model';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../bicycle-parking-video/component/bicycle-parking-video.model';

export class BicycleParkingContainerVideoWindow extends WindowViewModel {
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
