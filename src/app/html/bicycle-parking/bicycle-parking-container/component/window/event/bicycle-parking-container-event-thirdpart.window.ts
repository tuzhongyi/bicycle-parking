import { formatDate } from '@angular/common';
import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { ThirdPartEventRecord } from '../../../../../../common/network/model/third-part/tpp-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../../common/tools/language';
import { BicycleParkingRecordThirdPartTableArgs } from '../../../../bicycle-parking-table/bicycle-parking-record-thirdpart-table/bicycle-parking-record-thirdpart-table-content/bicycle-parking-record-thirdpart-table-content.model';
import { BicycleParkingContainerComponent } from '../../bicycle-parking-container.component';

export class BicycleParkingContainerEventThirdPartWindow extends WindowViewModel {
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
  title = '预警记录';
  args?: BicycleParkingRecordThirdPartTableArgs;

  on = {
    image: (args: PagedArgs<ThirdPartEventRecord>) => {
      this.that.window.picture.title = `${
        args.data.Address ? args.data.Address + ' ' : ''
      }${formatDate(args.data.EventTime, Language.yyyyMMddHHmmss, 'en')}`;
      let images: string[] = [];
      if (args.data.Resources) {
        images = args.data.Resources.filter((x) => !!x.ImageUrl).map(
          (x) => x.ImageUrl!
        );
      }
      if (args.data.Assignment && args.data.Assignment.HandledImageUrls) {
        let urls = args.data.Assignment.HandledImageUrls;
        images = images.concat(urls);
      }
      this.that.window.picture.index = args.page.PageIndex - 1;
      this.that.window.picture.page = Page.create(
        args.page.PageIndex,
        images.length
      );
      this.that.window.picture.datas = [...images];
      this.that.window.picture.show = true;
    },
    video: (data: ThirdPartEventRecord) => {
      this.that.window.video.title = `${
        data.Address ? data.Address + ' ' : ''
      }${formatDate(data.EventTime, Language.yyyyMMddHHmmss, 'en')}`;
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.that.window.video.args.playback = {
          cameraId: resource.ResourceId,
          duration: DateTimeTool.before(data.EventTime),
          stream: 1,
        };
        this.that.window.video.show = true;
      }
    },
  };
}
