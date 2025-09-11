import { Injectable } from '@angular/core';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';
import { ExportTool } from '../../../../../common/tools/export-tool/export.tool';
import {
  HowellExportModel,
  IExportConverter,
} from '../../../../../common/tools/export-tool/hw-export.model';
import { Language } from '../../../../../common/tools/language';
import { InfoDetailsDivisionTableItem } from '../info-details-division-table.model';

@Injectable()
export class InfoDetailsDivisionTableDownloadBusiness {
  constructor(private tool: ExportTool) {}

  download(division: Division, datas: InfoDetailsDivisionTableItem[]) {
    let childtype = EnumTool.division.child(division.DivisionType);
    let title = `${division.Name} ${Language.DivisionType(childtype)}信息`;
    let headers = ['序号', '名称', '管理员数量', '管理人员', '联系方式'];
    let converter = new Converter();
    this.tool.csv(title, headers, datas, converter);
  }
}

class Converter implements IExportConverter<InfoDetailsDivisionTableItem[]> {
  async Convert(
    source: InfoDetailsDivisionTableItem[],
    ...res: any[]
  ): Promise<HowellExportModel> {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.name);
      value.push(data.member.count);
      if (data.member.default) {
        value.push(data.member.default.Name);
        value.push(`'${data.member.default.MobileNo}`);
      } else {
        value.push('');
        value.push('');
      }
      model.rowValues.push(value);
    }
    return model;
  }
}
