import { EventEmitter } from '@angular/core';

export class BicycleParkingMapAMapConfigController {
  static event = {
    mousemoving: new EventEmitter<[number, number]>(),
  };

  static height = 15;
  static color = {
    border: {
      root: '#00d8ff',
      division: 'rgba(0, 216, 255, 1)',
      selected: '#00f6ff',
    },
    plain: {
      division: 'rgba(40, 108, 241, 0.3)',
      selected: 'rgba(56, 186, 255, 0.7) ',
      community: 'rgba(0, 216, 255, 0.3)',
    },
  };
}
