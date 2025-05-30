import { Injectable } from '@angular/core';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';

@Injectable()
export class BicycleParkingContainerDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  async load() {
    let source = await this.data();

    let group = ArrayTool.groupBy<Division, number>(source, (x) => {
      return x.DivisionType;
    });

    let keys = Object.keys(group);
    let datas = [];
    if (keys.length > 1) {
      let parents = group[keys[0]];
      let children = group[keys[1]];
      for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        datas.push(parent);
        for (let j = 0; j < children.length; j++) {
          let child = children[j];
          child.Name = child.Name.replace(parent.Name, '');
          datas.push(child);
        }
      }
      return datas;
    } else {
      return source;
    }
  }

  private data() {
    return this.service.cache.all();
  }
}
