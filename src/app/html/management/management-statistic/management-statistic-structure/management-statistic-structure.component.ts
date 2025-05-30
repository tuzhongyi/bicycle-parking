import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManagementStatisticHeadComponent } from '../management-statistic-head/management-statistic-head.component';

@Component({
  selector: 'howell-management-statistic-structure',
  imports: [CommonModule, ManagementStatisticHeadComponent],
  templateUrl: './management-statistic-structure.component.html',
  styleUrl: './management-statistic-structure.component.less',
})
export class ManagementStatisticStructureComponent {
  title = '组织架构';
}
