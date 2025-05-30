import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from '../../../../common/components/video-player/video-player.component';
import { BicycleParkingVideoBusiness } from './bicycle-parking-video.business';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from './bicycle-parking-video.model';

@Component({
  selector: 'howell-bicycle-parking-video',
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './bicycle-parking-video.component.html',
  styleUrl: './bicycle-parking-video.component.less',
  providers: [BicycleParkingVideoBusiness],
})
export class BicycleParkingVideoComponent implements OnInit, OnDestroy {
  @Input() preview?: EventEmitter<VideoPreviewArgs>;
  @Input() playback?: EventEmitter<VideoPlaybackArgs>;
  @Output() opened = new EventEmitter<void>();
  @Input() playing = false;
  @Output() playingChange = new EventEmitter<boolean>();

  constructor(private business: BicycleParkingVideoBusiness) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.preview) {
      let sub = this.preview.subscribe((args) => {
        this.video.preview(args);
      });
      this.subscription.add(sub);
    }
    if (this.playback) {
      let sub = this.playback.subscribe((args) => {
        this.video.playback(args);
      });
      this.subscription.add(sub);
    }
    this.opened.emit();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  video = {
    src: '',
    preview: (args: VideoPreviewArgs) => {
      this.business.preview(args).then((x) => {
        let url = x.Url;
        if (url.indexOf('?') < 0 && x.Username && x.Password) {
          url += `?user=${x.Username}&password=${x.Password}`;
        }
        this.video.src = url;
      });
    },
    playback: (args: VideoPlaybackArgs) => {
      this.business.playback(args).then((x) => {
        let url = x.Url;
        if (url.indexOf('?') < 0 && x.Username && x.Password) {
          url += `?user=${x.Username}&password=${x.Password}`;
        }
        this.video.src = url;
      });
    },
  };
  on = {
    playing: () => {
      this.playing = true;
      this.playingChange.emit(this.playing);
    },
    stoping: () => {
      this.playing = false;
      this.playingChange.emit(this.playing);
      this.video.src = '';
    },
  };
}
