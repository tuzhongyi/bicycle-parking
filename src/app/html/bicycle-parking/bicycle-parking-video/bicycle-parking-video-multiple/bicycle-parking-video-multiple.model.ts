import { EventEmitter } from '@angular/core';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../component/bicycle-parking-video.model';

export class BicycleParkingVideoArgs {
  image = '';
  preview?: VideoPreviewArgs;
  playback?: VideoPlaybackArgs;
}
export class BicycleParkingVideoItem {
  image = '';
  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();
}
