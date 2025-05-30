import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-bicycle-parking-card',
  imports: [],
  templateUrl: './bicycle-parking-card.component.html',
  styleUrl: './bicycle-parking-card.component.less',
})
export class BicycleParkingCardComponent {
  @Input() title = '';
  @Input() padding = '20px 30px 20px 30px';
}
