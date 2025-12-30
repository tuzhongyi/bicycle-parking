import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { SmokeEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { BicycleParkingContainerComponent } from '../../bicycle-parking-container.component';

export class BicycleParkingContainerEventSmokeWindow extends WindowViewModel {
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
  title = '火灾预警记录';

  on = {
    image: (args: PagedArgs<SmokeEventRecord>) => {
      let images: string[] = [];
      this.that.window.picture.title = args.data.Data.StationName;
      if (args.data.Data.CameraImageUrls) {
        images = [...args.data.Data.CameraImageUrls.map((x) => x.ImageUrl)];
      }
      if (args.data.Data.ProcessImageUrl) {
        images.push(args.data.Data.ProcessImageUrl);
      }
      this.that.window.picture.index = args.page.PageIndex - 1;
      this.that.window.picture.page = Page.create(
        args.page.PageIndex,
        images.length
      );
      this.that.window.picture.datas = [...images];
      this.that.window.picture.show = true;
    },
    video: (data: SmokeEventRecord) => {
      this.that.on.list.video(data);
    },
  };
}
