import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-management-statistic-head',
  imports: [CommonModule],
  templateUrl: './management-statistic-head.component.html',
  styleUrl: './management-statistic-head.component.less',
})
export class ManagementStatisticHeadComponent {
  @Input() title = '';
}
