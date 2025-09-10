import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { IEventRecord } from '../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { SmokeEventRecord } from '../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { Page } from '../../../common/network/model/page_list.model';
import { DateTimeTool } from '../../../common/tools/date-time-tool/datetime.tool';
import { PathTool } from '../../../common/tools/path-tool/path.tool';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../bicycle-parking/bicycle-parking-video/component/bicycle-parking-video.model';
import { ManagementContainerImports } from './management-container.import';
import { ManagementContainerProviders } from './management-container.provider';
import { ManagementContainerWindow } from './management-container.window';

// BicycleParkingMapComponent,
@Component({
  selector: 'howell-management-container',
  templateUrl: './management-container.component.html',
  styleUrl: './management-container.component.less',
  imports: [...ManagementContainerImports],
  providers: [...ManagementContainerProviders],
})
export class ManagementContainerComponent implements OnInit, OnDestroy {
  constructor() {
    console.log(`screen: ${screen.width} * ${screen.height}`);
  }

  Path = PathTool;
  window = new ManagementContainerWindow();
  load = new EventEmitter<void>();
  handle?: NodeJS.Timeout;
  get ratio() {
    return (Math.floor((screen.width / screen.height) * 100) / 100)
      .toFixed(2)
      .replace('.', '-');
  }

  ngOnInit(): void {
    this.regist();
  }

  private regist() {
    this.handle = setInterval(() => {
      this.load.emit();
    }, 1000 * 60 * 1);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }

  picture = {
    page: (page: Page) => {
      this.window.picture.index = page.PageIndex - 1;
      this.window.picture.page = page;
    },
  };
  video = {
    preview: new EventEmitter<VideoPreviewArgs>(),
    playback: new EventEmitter<VideoPlaybackArgs>(),
  };

  on = {
    list: {
      picture: (data: IEventRecord) => {
        if (data instanceof SmokeEventRecord) {
          if (
            data.Data.CameraImageUrls &&
            data.Data.CameraImageUrls.length > 0
          ) {
            this.window.picture.datas = data.Data.CameraImageUrls.map(
              (x) => x.ImageUrl
            );
            this.window.picture.title = data.Data.StationName;
            this.window.picture.page = Page.create(
              1,
              data.Data.CameraImageUrls.length
            );
            this.window.picture.show = true;
          }
        }
      },
      video: (data: IEventRecord) => {
        if (data instanceof SmokeEventRecord) {
          this.window.video.clear();
          this.window.video.title = data.Data.StationName;
          if (
            data.Data.CameraImageUrls &&
            data.Data.CameraImageUrls.length > 0
          ) {
            let camera = data.Data.CameraImageUrls[0];
            this.window.video.args.playback = {
              cameraId: camera.CameraId,
              duration: DateTimeTool.before(data.EventTime),
              stream: 1,
            };
            this.window.video.show = true;
          }
        }
        this.window.video.show = true;
      },
    },
    video: {
      play: () => {
        if (this.window.video.show) {
          if (this.window.video.args.playback) {
            this.video.playback.emit(this.window.video.args.playback);
          } else if (this.window.video.args.preview) {
            this.video.preview.emit(this.window.video.args.preview);
          } else {
            this.window.video.show = false;
          }
        }
      },
    },
  };
}
