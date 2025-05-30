import { ManagementContainerCardController } from './controller/card/bicycle-parking-container-card.controller';
import { ManagementContainerController } from './controller/management-container.controller';

const controllers = [
  ManagementContainerController,
  ManagementContainerCardController,
];
export const ManagementContainerProviders = [...controllers];
