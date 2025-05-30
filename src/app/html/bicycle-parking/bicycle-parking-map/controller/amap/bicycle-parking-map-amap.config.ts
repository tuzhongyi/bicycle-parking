import { EventEmitter } from '@angular/core';

export class BicycleParkingMapAMapConfigController {
  static event = {
    mousemoving: new EventEmitter<[number, number]>(),
  };

  static height = 15;
  static color = {
    border: {
      root: '#00d8ff',
      division: '#00d8ff',
      selected: '#00f6ff',
    },
    plain: {
      division: 'rgba(40, 108, 241, 0.3)',
      selected: 'rgba(56, 186, 255, 0.7) ',
    },
  };
}
