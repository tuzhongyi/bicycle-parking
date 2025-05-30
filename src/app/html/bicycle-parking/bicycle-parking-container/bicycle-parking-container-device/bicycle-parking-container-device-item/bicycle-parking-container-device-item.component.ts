import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-bicycle-parking-container-device-item',
  imports: [],
  templateUrl: './bicycle-parking-container-device-item.component.html',
  styleUrl: './bicycle-parking-container-device-item.component.less',
})
export class BicycleParkingContainerDeviceItemComponent {
  @Input() name = '';
  @Input() type = '';
  @Input() value = 0;
  @Input() count = 0;
}
