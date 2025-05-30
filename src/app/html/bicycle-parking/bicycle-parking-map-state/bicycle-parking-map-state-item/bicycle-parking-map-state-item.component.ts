import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BicycleParkingMapStateItem } from './bicycle-parking-map-state-item.model';

@Component({
  selector: 'howell-bicycle-parking-map-state-item',
  imports: [CommonModule],
  templateUrl: './bicycle-parking-map-state-item.component.html',
  styleUrl: './bicycle-parking-map-state-item.component.less',
})
export class BicycleParkingMapStateItemComponent {
  @Input() data = new BicycleParkingMapStateItem();
  constructor() {}
}
