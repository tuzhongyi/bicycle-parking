import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BicycleParkingDetailsInfoItem } from './bicycle-parking-details-info-item.model';

@Component({
  selector: 'howell-bicycle-parking-details-info-item',
  imports: [CommonModule],
  templateUrl: './bicycle-parking-details-info-item.component.html',
  styleUrl: './bicycle-parking-details-info-item.component.less',
})
export class BicycleParkingDetailsInfoItemComponent {
  @Input() data = new BicycleParkingDetailsInfoItem();
  @Input() selected = false;
}
