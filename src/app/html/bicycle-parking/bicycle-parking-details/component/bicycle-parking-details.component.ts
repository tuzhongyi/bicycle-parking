import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera } from '../../../../common/network/model/garbage-station/camera.model';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { PathTool } from '../../../../common/tools/path-tool/path.tool';
import { BicycleParkingVideoMultipleComponent } from '../../bicycle-parking-video/bicycle-parking-video-multiple/bicycle-parking-video-multiple.component';
import { BicycleParkingVideoArgs } from '../../bicycle-parking-video/bicycle-parking-video-multiple/bicycle-parking-video-multiple.model';
import { BicycleParkingDetailsInfoComponent } from '../bicycle-parking-details-info/bicycle-parking-details-info.component';
import { BicycleParkingDetailsBusiness } from './bicycle-parking-details.business';

@Component({
  selector: 'howell-bicycle-parking-details',
  imports: [
    CommonModule,
    BicycleParkingDetailsInfoComponent,
    BicycleParkingVideoMultipleComponent,
  ],
  templateUrl: './bicycle-parking-details.component.html',
  styleUrl: './bicycle-parking-details.component.less',
  providers: [BicycleParkingDetailsBusiness],
})
export class BicycleParkingDetailsComponent implements OnInit {
  @Input() data?: GarbageStation;
  @Output() preview = new EventEmitter<Camera>();
  @Output() playback = new EventEmitter<Camera>();

  constructor(private business: BicycleParkingDetailsBusiness) {}

  Path = PathTool;

  switch = 1;

  videos: BicycleParkingVideoArgs[] = [];
  loading = false;

  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);
    }
  }

  load(data: GarbageStation) {
    if (data.Cameras) {
      this.videos = data.Cameras.map((x) => {
        let item = new BicycleParkingVideoArgs();
        item.image = x.ImageUrl || '';
        item.preview = {
          cameraId: x.Id,
          stream: 1,
        };
        return item;
      });
    }
  }

  on = {
    camera: {
      preview: (item: Camera) => {
        this.preview.emit(item);
      },
      playback: (item: Camera) => {
        this.playback.emit(item);
      },
    },
    capture: () => {
      if (this.data) {
        this.loading = true;
        this.business
          .capture(this.data.Id)
          .then((pictures) => {
            let videos = [...this.videos];
            for (let i = 0; i < pictures.length; i++) {
              const picture = pictures[i];
              if (!picture.Id) continue;
              let index = videos.findIndex((x) => {
                if (x.preview) {
                  return x.preview.cameraId === picture.CameraId;
                }
                if (x.playback) {
                  return x.playback.cameraId == picture.CameraId;
                }
                return false;
              });
              if (index >= 0) {
                videos[index].image = picture.Id;
              }
            }
            this.videos = videos;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  };
}
