import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { BicycleParkingVideoImageComponent } from '../bicycle-parking-video-image/bicycle-parking-video-image.component';
import {
  BicycleParkingVideoArgs,
  BicycleParkingVideoItem,
} from './bicycle-parking-video-multiple.model';

@Component({
  selector: 'howell-bicycle-parking-video-multiple',
  imports: [CommonModule, BicycleParkingVideoImageComponent],
  templateUrl: './bicycle-parking-video-multiple.component.html',
  styleUrl: './bicycle-parking-video-multiple.component.less',
})
export class BicycleParkingVideoMultipleComponent implements OnChanges {
  @Input() datas: BicycleParkingVideoArgs[] = [];

  items: (BicycleParkingVideoArgs | undefined)[] = [];
  pow = 1;
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['datas']);
  }
  change = {
    data: (change: SimpleChange) => {
      if (change) {
        let sqrt = Math.ceil(Math.sqrt(this.datas.length));
        this.pow = Math.pow(sqrt, 2);

        this.items = [...this.datas];

        while (this.items.length < this.pow) {
          this.items.push(undefined);
        }
      }
    },
  };

  on = {
    play: (item: BicycleParkingVideoItem) => {},
  };
}
