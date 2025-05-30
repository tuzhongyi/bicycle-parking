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
import { BicycleParkingContainerTaskChartOption } from './bicycle-parking-container-task-chart.option';

@Component({
  selector: 'howell-bicycle-parking-container-task-chart',
  imports: [],
  templateUrl: './bicycle-parking-container-task-chart.component.html',
  styleUrl: './bicycle-parking-container-task-chart.component.less',
})
export class BicycleParkingContainerTaskChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() value = 100;
  @ViewChild('task') element?: ElementRef;
  option = BicycleParkingContainerTaskChartOption;
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
