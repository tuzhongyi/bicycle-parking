import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { PathTool } from '../../../../common/tools/path-tool/path.tool';
import { BicycleParkingVideoMultipleComponent } from '../../bicycle-parking-video/bicycle-parking-video-multiple/bicycle-parking-video-multiple.component';
import { BicycleParkingVideoArgs } from '../../bicycle-parking-video/bicycle-parking-video-multiple/bicycle-parking-video-multiple.model';
import { BicycleParkingDetailsInfoComponent } from '../bicycle-parking-details-info/bicycle-parking-details-info.component';

@Component({
  selector: 'howell-bicycle-parking-details',
  imports: [
    CommonModule,
    BicycleParkingDetailsInfoComponent,
    BicycleParkingVideoMultipleComponent,
  ],
  templateUrl: './bicycle-parking-details.component.html',
  styleUrl: './bicycle-parking-details.component.less',
})
export class BicycleParkingDetailsComponent implements OnInit {
  @Input() data?: GarbageStation;

  constructor() {}

  Path = PathTool;

  switch = 1;

  videos: BicycleParkingVideoArgs[] = [];

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
}
