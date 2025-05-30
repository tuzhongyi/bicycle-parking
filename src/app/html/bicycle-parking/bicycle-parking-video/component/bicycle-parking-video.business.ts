import { Injectable } from '@angular/core';
import { SRServerRequestService } from '../../../../common/network/request/ai-sr-server/sr-server.service';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from './bicycle-parking-video.model';

@Injectable()
export class BicycleParkingVideoBusiness {
  constructor(private service: SRServerRequestService) {}

  preview(args: VideoPreviewArgs) {
    return this.service.preview(args.cameraId, args.stream);
  }
  playback(args: VideoPlaybackArgs) {
    return this.service.playback(args.cameraId, args.duration, args.stream);
  }
}
