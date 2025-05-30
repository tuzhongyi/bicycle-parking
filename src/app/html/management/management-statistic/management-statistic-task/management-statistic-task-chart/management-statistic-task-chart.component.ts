import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartAbstract } from '../../../../share/abstract/chart.abstract';
import { ManagementStatisticTaskChartOption } from './management-statistic-task-chart.option';

@Component({
  selector: 'howell-management-statistic-task-chart',
  imports: [],
  templateUrl: './management-statistic-task-chart.component.html',
  styleUrl: './management-statistic-task-chart.component.less',
})
export class ManagementStatisticTaskChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() value = 100;
  @ViewChild('task') element?: ElementRef;
  option = ManagementStatisticTaskChartOption;
  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy() {
    this.destroy();
  }

  private load() {
    this.chart.get().then((chart) => {
      (this.option.series as any)[0].data = [100 - this.value];
      chart.setOption(this.option);
    });
  }
}
