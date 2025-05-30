import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../common/network/model/garbage-station/user.model';

@Component({
  selector: 'howell-management-header-operation',
  imports: [],
  templateUrl: './management-header-operation.component.html',
  styleUrl: './management-header-operation.component.less',
})
export class ManagementHeaderOperationComponent {
  @Input() user?: User;
  @Output() setting = new EventEmitter<void>();

  onsetting() {
    this.setting.emit();
  }
}
