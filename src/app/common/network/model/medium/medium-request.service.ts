import { Injectable } from '@angular/core';
import { PicturesUrl } from '../../url/aiop/medium/pictures/pictures.url';

@Injectable({
  providedIn: 'root',
})
export class MediumRequestService {
  get(id: string) {
    return PicturesUrl.jpg(id);
  }
}
