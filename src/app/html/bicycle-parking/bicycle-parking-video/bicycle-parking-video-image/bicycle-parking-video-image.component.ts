import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { PictureComponent } from '../../../../common/components/picture/component/picture.component';
import { BicycleParkingVideoComponent } from '../component/bicycle-parking-video.component';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../component/bicycle-parking-video.model';

@Component({
  selector: 'howell-bicycle-parking-video-image',
  imports: [CommonModule, BicycleParkingVideoComponent, PictureComponent],
  templateUrl: './bicycle-parking-video-image.component.html',
  styleUrl: './bicycle-parking-video-image.component.less',
})
export class BicycleParkingVideoImageComponent {
  @Input() image = '';
  @Input('preview') _preview?: VideoPreviewArgs;
  @Input('playback') _playback?: VideoPlaybackArgs;

  opened = false;
  playing = false;

  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();

  on = {
    open: () => {
      this.opened = true;
    },
    play: () => {
      if (this._playback) {
        this.playback.emit(this._playback);
      } else if (this._preview) {
        this.preview.emit(this._preview);
      }
    },
  };
}
