import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DivisionType } from '../../../../../common/enum/division-type.enum';
import { IDivision } from '../../../../../common/network/model/garbage-station/division.model';

@Component({
  selector: 'howell-bicycle-parking-container-division-item',
  imports: [CommonModule],
  templateUrl: './bicycle-parking-container-division-item.component.html',
  styleUrl: './bicycle-parking-container-division-item.component.less',
})
export class BicycleParkingContainerDivisionItemComponent {
  @Input() data?: IDivision;
  @Input() selected = false;
  Type = DivisionType;
}
