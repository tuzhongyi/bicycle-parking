import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../common/network/model/garbage-station/user.model';

@Component({
  selector: 'howell-bicycle-parking-header-operation',
  imports: [],
  templateUrl: './bicycle-parking-header-operation.component.html',
  styleUrl: './bicycle-parking-header-operation.component.less',
})
export class BicycleParkingHeaderOperationComponent {
  @Input() user?: User;
  @Output() setting = new EventEmitter<void>();

  onsetting() {
    this.setting.emit();
  }
}
