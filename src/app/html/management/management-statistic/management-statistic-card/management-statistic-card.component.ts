import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-management-statistic-card',
  imports: [],
  templateUrl: './management-statistic-card.component.html',
  styleUrl: './management-statistic-card.component.less',
})
export class ManagementStatisticCardComponent {
  @Input() title: string = '';
}
