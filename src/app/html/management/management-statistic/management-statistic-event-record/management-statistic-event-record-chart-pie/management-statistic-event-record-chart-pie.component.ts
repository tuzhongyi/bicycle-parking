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
import { ManagementStatisticEventRecordChartPieOption } from './management-statistic-event-record-chart-pie.option';

@Component({
  selector: 'howell-management-statistic-event-record-chart-pie',
  imports: [],
  templateUrl: './management-statistic-event-record-chart-pie.component.html',
  styleUrl: './management-statistic-event-record-chart-pie.component.less',
})
export class ManagementStatisticEventRecordChartPieComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: [number, number, number] = [0, 0, 0];
  @Input() option = ManagementStatisticEventRecordChartPieOption;
  constructor() {
    super();
  }
  @ViewChild('pie') element?: ElementRef;
  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load(this.datas);
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  private set(data: [number, number, number]) {
    this.option.series[0].data[0].value = data[0];
    this.option.series[0].data[1].value = data[1];
    this.option.series[0].data[2].value = data[2];
  }

  private load(data: [number, number, number]) {
    this.chart.get().then((chart) => {
      this.option.series[0].labelLayout = (params: any) => {
        const points = params.labelLinePoints;
        const isLeft = params.labelRect.x < chart.getWidth() / 2;
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;

        return {
          labelLinePoints: points,
        };
      };
      this.set(data);
      chart.setOption(this.option);
    });
  }
}
