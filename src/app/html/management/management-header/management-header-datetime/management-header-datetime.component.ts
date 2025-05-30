import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Language } from '../../../../common/tools/language';

@Component({
  selector: 'howell-management-header-datetime',
  imports: [CommonModule],
  templateUrl: './management-header-datetime.component.html',
  styleUrl: './management-header-datetime.component.less',
})
export class ManagementHeaderDatetimeComponent implements OnInit, OnDestroy {
  date = signal(new Date());
  Language = Language;
  handle?: NodeJS.Timeout;

  ngOnInit(): void {
    this.handle = setInterval(() => {
      this.date = signal(new Date());
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }
}
