import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { Page } from '../../../../../common/network/model/page_list.model';

export class BicycleParkingContainerPictureWindow extends WindowViewModel {
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
