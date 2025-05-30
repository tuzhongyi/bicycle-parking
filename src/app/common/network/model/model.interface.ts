import { ClassConstructor } from 'class-transformer';
import { Page } from './page_list.model';

export interface IModel {}
export interface IIdModel<T = string> extends IModel {
  Id: T;
}
export interface IIdNameModel<T = string> extends IIdModel<T> {
  Name: string;
}
export class IdNameModel<T = string> implements IIdNameModel<T> {
  Id!: T;
  Name!: string;

  equals<T extends IdNameModel>(
    value?: IdNameModel,
    type?: ClassConstructor<T>
  ) {
    if (!value) return false;
    if (type) {
      if (type.name !== value.constructor.name) {
        return false;
      }
    }

    return this.Id === value.Id;
  }
}
export interface PagedArgs<T = any> {
  data: T;
  page: Page;
}
export interface ImagePagedArgs<T = any> extends PagedArgs<T> {
  index: number;
}
