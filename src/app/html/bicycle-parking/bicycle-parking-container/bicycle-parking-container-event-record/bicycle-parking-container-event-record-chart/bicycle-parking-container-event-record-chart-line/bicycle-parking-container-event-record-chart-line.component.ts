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
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { ChartAbstract } from '../../../../../share/abstract/chart.abstract';
import { BicycleParkingContainerEventRecordService } from '../../service/bicycle-parking-container-event-record.service';
import { BicycleParkingContainerEventRecordChartLineBusiness } from './bicycle-parking-container-event-record-chart-line.business';
import { BicycleParkingContainerEventRecordChartLineModel } from './bicycle-parking-container-event-record-chart-line.model';
import { BicycleParkingContainerEventRecordChartLineOption } from './bicycle-parking-container-event-record-chart-line.option';
@Component({
  selector: 'howell-bicycle-parking-container-event-record-chart-line',
  imports: [],
  templateUrl:
    './bicycle-parking-container-event-record-chart-line.component.html',
  styleUrl:
    './bicycle-parking-container-event-record-chart-line.component.less',
  providers: [
    BicycleParkingContainerEventRecordService,
    BicycleParkingContainerEventRecordChartLineBusiness,
  ],
})
export class BicycleParkingContainerEventRecordChartLineComponent
  extends ChartAbstract
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<string>;

  constructor(
    private business: BicycleParkingContainerEventRecordChartLineBusiness,
    private global: GlobalStorageService
  ) {
    super();
    this.echart.xAxis.init();
  }

  @ViewChild('line') element?: ElementRef;

  option = BicycleParkingContainerEventRecordChartLineOption;
  data = new BicycleParkingContainerEventRecordChartLineModel();
  private subscription = new Subscription();
  private echart = {
    xAxis: {
      data: [] as string[],
      init: () => {
        let today = new Date();
        let month = DateTimeTool.allMonth(today);
        let last = month.end.getDate();
        for (let i = 0; i < last; i++) {
          this.echart.xAxis.data.push(`${i + 1}`);
        }
      },
    },
    load: () => {
      this.chart.get().then((chart) => {
        (this.option.xAxis as any).data = [...this.echart.xAxis.data];
        (this.option.series as any)[0].data = [...this.data.smoker];
        (this.option.series as any)[1].data = [...this.data.charger];
        (this.option.series as any)[2].data = [...this.data.spray];
        chart.setOption(this.option);
      });
    },
  };

  ngOnInit(): void {
    this.regist();
    this.init();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy() {
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

  private load(divisionId: string) {
    this.business.load(divisionId).then((x) => {
      this.data = x;
      this.echart.load();
    });
  }
}
