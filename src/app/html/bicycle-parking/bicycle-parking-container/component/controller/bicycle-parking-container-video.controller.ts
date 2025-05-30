import { EventEmitter, Injectable } from '@angular/core';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../bicycle-parking-video/component/bicycle-parking-video.model';

@Injectable()
export class BicycleParkingContainerVideoController {
  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();
}
