import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-bicycle-parking-panel',
  imports: [],
  templateUrl: './bicycle-parking-panel.component.html',
  styleUrl: './bicycle-parking-panel.component.less',
})
export class BicycleParkingPanelComponent {
  @Input() title = '';
}
