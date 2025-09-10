import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { BicycleParkingContainerTaskBusiness } from '../../../bicycle-parking/bicycle-parking-container/bicycle-parking-container-task/component/business/bicycle-parking-container-task.business';
import { ManagementStatisticHeadComponent } from '../management-statistic-head/management-statistic-head.component';
import { ManagementStatisticTaskModel } from '../management-statistic-task/component/management-statistic-task.model';

@Component({
  selector: 'howell-management-statistic-alarm',
  imports: [CommonModule, FormsModule, ManagementStatisticHeadComponent],
  templateUrl: './management-statistic-alarm.component.html',
  styleUrl: './management-statistic-alarm.component.less',
  providers: [BicycleParkingContainerTaskBusiness],
})
export class ManagementStatisticAlarmComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  constructor(
    private business: BicycleParkingContainerTaskBusiness,
    private global: GlobalStorageService
  ) {}

  title = '预警处置';
  unit = TimeUnit.Year;
  Unit = TimeUnit;
  private subscription = new Subscription();

  data = new ManagementStatisticTaskModel();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  private load() {
    this.global.division.default.then((division) => {
      this.business.load(division.Id, this.unit).then((x) => {
        this.data.count = x.count;
        this.data.handled = x.handled;
        this.data.unhandled = x.unhandled;
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  change() {
    this.load();
  }
}
