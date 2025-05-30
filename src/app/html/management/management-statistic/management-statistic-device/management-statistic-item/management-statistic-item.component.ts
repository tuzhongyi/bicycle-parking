import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-management-statistic-item',
  imports: [CommonModule],
  templateUrl: './management-statistic-item.component.html',
  styleUrl: './management-statistic-item.component.less',
})
export class ManagementStatisticItemComponent {
  @Input() type: string = '';
  @Input() title = '';
  @Input() value = 0;
  @Input() count = 0;
}
