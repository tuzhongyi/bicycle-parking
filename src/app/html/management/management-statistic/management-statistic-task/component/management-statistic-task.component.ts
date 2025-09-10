import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { BicycleParkingContainerTaskBusiness } from '../../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-task/component/business/bicycle-parking-container-task.business';
import { ManagementStatisticHeadComponent } from '../../management-statistic-head/management-statistic-head.component';
import { ManagementStatisticTaskChartComponent } from '../management-statistic-task-chart/management-statistic-task-chart.component';
import { ManagementStatisticTaskModel } from './management-statistic-task.model';

@Component({
  selector: 'howell-management-statistic-task',
  imports: [
    CommonModule,
    ManagementStatisticHeadComponent,
    ManagementStatisticTaskChartComponent,
  ],
  templateUrl: './management-statistic-task.component.html',
  styleUrl: './management-statistic-task.component.less',
  providers: [BicycleParkingContainerTaskBusiness],
})
export class ManagementStatisticTaskComponent implements OnInit {
  constructor(
    private business: BicycleParkingContainerTaskBusiness,
    private global: GlobalStorageService
  ) {}

  title = '今年派单处置';
  unit = TimeUnit.Year;
  data = new ManagementStatisticTaskModel();

  ngOnInit(): void {
    this.global.division.default.then((x) => {
      this.load(x.Id, this.unit);
    });
  }

  private load(divisionId: string, unit: TimeUnit) {
    this.business.load(divisionId, unit).then((x) => {
      this.data.count = x.count;
      this.data.handled = x.handled;
      this.data.unhandled = x.unhandled;
    });
  }
}
