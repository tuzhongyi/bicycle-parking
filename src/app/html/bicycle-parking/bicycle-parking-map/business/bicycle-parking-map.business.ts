import { Injectable } from '@angular/core';
import { BicycleParkingMapCommunityBusiness } from './bicycle-parking-map-community.business';
import { BicycleParkingMapDataBusiness } from './bicycle-parking-map-data.business';
import { BicycleParkingMapStationBusiness } from './bicycle-parking-map-station.business';

@Injectable()
export class BicycleParkingMapBusiness {
  constructor(
    public map: BicycleParkingMapDataBusiness,
    public station: BicycleParkingMapStationBusiness,
    public community: BicycleParkingMapCommunityBusiness
  ) {}
}
