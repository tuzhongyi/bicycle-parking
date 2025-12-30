import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { BicycleParkingContainerComponent } from '../../bicycle-parking-container.component';

export class BicycleParkingContainerEventSensorWindow extends WindowViewModel {
  constructor(private that: BicycleParkingContainerComponent) {
    super();
  }
  style: any = {
    width: '100%',
    height: 'calc(100% - 85px)',
    position: 'absolute',
    top: '85px',
    left: '0',
    transform: 'none',
    border: 'none',
    boxShadow: 'none',
  };
  title = '预警记录';
}
