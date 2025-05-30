import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class BicycleParkingContainerTaskComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<string>;
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
  ngOnDestroy(): void {
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

  private init() {
    this.global.division.selected.then((x) => {
      this.load(x.Id);
    });
  }

  private load(divisionId: string) {
    this.business.load(divisionId).then((data) => {
      this.data = data;
    });
  }
}
