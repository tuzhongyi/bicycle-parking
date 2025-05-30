import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { BicycleParkingContainerDivisionItemComponent } from '../bicycle-parking-container-division-item/bicycle-parking-container-division-item.component';
import { BicycleParkingContainerDivisionBusiness } from './bicycle-parking-container-division.business';

@Component({
  selector: 'howell-bicycle-parking-container-division',
  imports: [CommonModule, BicycleParkingContainerDivisionItemComponent],
  templateUrl: './bicycle-parking-container-division.component.html',
  styleUrl: './bicycle-parking-container-division.component.less',
  providers: [BicycleParkingContainerDivisionBusiness],
})
export class BicycleParkingContainerDivisionComponent implements OnInit {
  constructor(
    private business: BicycleParkingContainerDivisionBusiness,
    private global: GlobalStorageService
  ) {}

  datas: Division[] = [];
  selected?: Division;

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load().then((datas) => {
      this.datas = datas;
      this.global.division.selected.then((division) => {
        this.selected = this.datas.find((x) => x.Id === division.Id);
      });
    });
  }

  on = {
    select: (item: Division) => {
      this.selected = item;
      this.global.division.select(item);
    },
  };
}
