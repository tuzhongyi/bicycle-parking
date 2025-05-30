import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IEventRecord } from '../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { SmokeEventRecord } from '../../../../common/network/model/garbage-station/event-record/smoke/smoke-event-record.model';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { Page } from '../../../../common/network/model/page_list.model';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { garbageManagementContainerImports } from './bicycle-parking-container.import';
import { garbageManagementContainerProviders } from './bicycle-parking-container.provider';
import { BicycleParkingContainerController } from './controller/bicycle-parking-container.controller';
import { BicycleParkingContainerWindow } from './window/bicycle-parking-container.window';

// BicycleParkingMapComponent,
@Component({
  selector: 'howell-bicycle-parking-container',
  templateUrl: './bicycle-parking-container.component.html',
  styleUrl: './bicycle-parking-container.component.less',
  imports: [...garbageManagementContainerImports],
  providers: [...garbageManagementContainerProviders],
})
export class BicycleParkingContainerComponent implements OnInit, OnDestroy {
  load = new EventEmitter<string>();
  constructor(
    private controller: BicycleParkingContainerController,
    private global: GlobalStorageService
  ) {
    this.regist();
  }
  get map() {
    return this.controller.map;
  }
  get state() {
    return this.controller.state;
  }
  get card() {
    return this.controller.card;
  }
  get video() {
    return this.controller.video;
  }
  window = new BicycleParkingContainerWindow();

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {}

  private regist() {
    this.global.division.change.subscribe((x) => {
      this.load.emit(x.Id);
    });
  }

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
          this.window.video.title = data.Data.StationName;
          if (
            data.Data.CameraImageUrls &&
            data.Data.CameraImageUrls.length > 0
          ) {
            let camera = data.Data.CameraImageUrls[0];
            this.window.video.args = {
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
    map: {
      select: (data: GarbageStation) => {
        this.window.details.data = data;
        this.window.details.title = data.Name;
        this.window.details.show = true;
      },
    },
    video: {
      play: () => {
        if (this.window.video.show && this.window.video.args) {
          this.video.playback.emit(this.window.video.args);
        }
      },
    },
  };

  picture = {
    page: (page: Page) => {
      this.window.picture.index = page.PageIndex - 1;
      this.window.picture.page = page;
    },
  };
}
