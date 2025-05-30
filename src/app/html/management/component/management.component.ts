import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'howell-management',
  imports: [RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.less',
})
export class ManagementComponent {
  constructor(title: Title) {
    title.setTitle('智慧车棚一网统管平台');
  }
}
