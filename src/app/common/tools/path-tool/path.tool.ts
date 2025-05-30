import { PathToolConfig } from './config-path.tool';
import { PathToolManagement } from './management-path.tool';
import { PathToolMap } from './map-path.tool';
import { PathToolParking } from './parking-path.tool';

export class PathTool {
  private static node = location.port == `9527` ? `` : `/bicycle-parking`;
  static management = new PathToolManagement(this.node);
  static map = new PathToolMap(this.node);
  static parking = new PathToolParking(this.node);
  static config = new PathToolConfig(this.node);
}
