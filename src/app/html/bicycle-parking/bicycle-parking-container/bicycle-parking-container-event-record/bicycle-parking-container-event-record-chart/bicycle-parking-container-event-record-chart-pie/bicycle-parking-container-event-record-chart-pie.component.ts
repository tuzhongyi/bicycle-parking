import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { ChartAbstract } from '../../../../../share/abstract/chart.abstract';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartPieBusiness } from './bicycle-parking-container-event-record-chart-pie.business';
import { BicycleParkingContainerEventRecordChartPieModel } from './bicycle-parking-container-event-record-chart-pie.model';
import { BicycleParkingContainerEventRecordChartPieOption } from './bicycle-parking-container-event-record-chart-pie.option';

@Component({
  selector: 'howell-bicycle-parking-container-event-record-chart-pie',
  imports: [],
  templateUrl:
    './bicycle-parking-container-event-record-chart-pie.component.html',
  styleUrl: './bicycle-parking-container-event-record-chart-pie.component.less',
  providers: [
    BicycleParkingContainerEventRecordService,
    BicycleParkingContainerEventRecordChartPieBusiness,
  ],
})
export class BicycleParkingContainerEventRecordChartPieComponent
  extends ChartAbstract
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<string>;
  @Input() unit = TimeUnit.Month;

  constructor(
    private business: BicycleParkingContainerEventRecordChartPieBusiness,
    private global: GlobalStorageService
  ) {
    super();
  }

  private data = new BicycleParkingContainerEventRecordChartPieModel();
  private option = BicycleParkingContainerEventRecordChartPieOption;
  private subscription = new Subscription();
  @ViewChild('pie') element?: ElementRef;

  ngOnInit(): void {
    this.regist();
    this.init();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy(): void {
    this.destroy();
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
    }
  }

  override init() {
    super.init();
    this.global.division.selected.then((x) => {
      this.load(x.Id);
    });
  }

  load(divisionId: string) {
    this.business.load(divisionId, this.unit).then((x) => {
      this.data = x;
      this._chart.load(this.data);
    });
  }

  private _chart = {
    set: (data: BicycleParkingContainerEventRecordChartPieModel) => {
      this.option.series[0].name = `${new Date().getMonth() + 1}月`;
      this.option.series[0].data[0].value = data.smoker;
      this.option.series[0].data[1].value = data.charger;
      this.option.series[0].data[2].value = data.spray;
    },

    load: (data: BicycleParkingContainerEventRecordChartPieModel) => {
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
        this._chart.set(data);
        chart.setOption(this.option);
      });
    },
  };
}
