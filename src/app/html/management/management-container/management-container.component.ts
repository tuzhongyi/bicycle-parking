import { Component } from '@angular/core';

import { PathTool } from '../../../common/tools/path-tool/path.tool';
import { ManagementContainerImports } from './management-container.import';
import { ManagementContainerProviders } from './management-container.provider';

// BicycleParkingMapComponent,
@Component({
  selector: 'howell-management-container',
  templateUrl: './management-container.component.html',
  styleUrl: './management-container.component.less',
  imports: [...ManagementContainerImports],
  providers: [...ManagementContainerProviders],
})
export class ManagementContainerComponent {
  Path = PathTool;
}
