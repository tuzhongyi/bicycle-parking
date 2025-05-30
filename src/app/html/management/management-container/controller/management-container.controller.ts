import { Injectable } from '@angular/core';
import { ManagementContainerCardController } from './card/bicycle-parking-container-card.controller';

@Injectable()
export class ManagementContainerController {
  constructor(public card: ManagementContainerCardController) {}
}
