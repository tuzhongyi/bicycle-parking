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
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { ChartAbstract } from '../../../../share/abstract/chart.abstract';
import { ManagementStatisticEventRecordChartLineOption } from './management-statistic-event-record-chart-line.option';
@Component({
  selector: 'howell-management-statistic-event-record-chart-line',
  imports: [],
  templateUrl: './management-statistic-event-record-chart-line.component.html',
  styleUrl: './management-statistic-event-record-chart-line.component.less',
})
export class ManagementStatisticEventRecordChartLineComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: number[][] = [];
  constructor() {
    super();
    this._init();
  }

  @ViewChild('line') element?: ElementRef;
  xAxis: string[] = [];
  option = ManagementStatisticEventRecordChartLineOption;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngAfterViewInit(): void {
    // if (this.element) {
    //   let chart = echarts.init(this.element.nativeElement);
    //   this.chart.set(chart);
    // }
    this.view();
  }
  ngOnDestroy() {
    this.destroy();
  }

  private _init() {
    let today = new Date();
    let year = DateTimeTool.allYear(today);
    let last = year.end.getMonth() + 1;
    for (let i = 0; i < last; i++) {
      this.xAxis.push(`${i + 1}`);
    }
  }

  private load() {
    this.chart.get().then((chart) => {
      (this.option.xAxis as any).data = [...this.xAxis];
      (this.option.series as any)[0].data = [...this.datas[0]];
      (this.option.series as any)[1].data = [...this.datas[1]];
      (this.option.series as any)[2].data = [...this.datas[2]];
      chart.setOption(this.option);
    });
  }
}
