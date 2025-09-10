import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { BicycleParkingContainerTaskChartComponent } from '../bicycle-parking-container-task-chart/bicycle-parking-container-task-chart.component';
import { BicycleParkingContainerTaskModel } from './bicycle-parking-container-task.model';
import { BicycleParkingContainerTaskBusiness } from './business/bicycle-parking-container-task.business';

@Component({
  selector: 'howell-bicycle-parking-container-task',
  imports: [CommonModule, BicycleParkingContainerTaskChartComponent],
  templateUrl: './bicycle-parking-container-task.component.html',
  styleUrl: './bicycle-parking-container-task.component.less',
  providers: [BicycleParkingContainerTaskBusiness],
})
export class BicycleParkingContainerTaskComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') _load?: EventEmitter<string>;
  @Input() unit = TimeUnit.Year;
  constructor(
    private business: BicycleParkingContainerTaskBusiness,
    private global: GlobalStorageService
  ) {}

  data = new BicycleParkingContainerTaskModel();
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unit'] && !changes['unit'].firstChange) {
      this.init();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x, this.unit);
      });
      this.subscription.add(sub);
    }
  }

  private init() {
    this.global.division.selected.then((x) => {
      this.load(x.Id, this.unit);
    });
  }

  private load(divisionId: string, unit: TimeUnit) {
    this.business.load(divisionId, unit).then((data) => {
      this.data = data;
    });
  }
}
