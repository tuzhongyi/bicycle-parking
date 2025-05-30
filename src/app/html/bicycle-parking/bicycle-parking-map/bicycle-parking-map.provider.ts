import { BicycleParkingMapDataBusiness } from './business/bicycle-parking-map-data.business';
import { BicycleParkingMapStationBusiness } from './business/bicycle-parking-map-station.business';
import { BicycleParkingMapBusiness } from './business/bicycle-parking-map.business';
import { BicycleParkingMapAMapController } from './controller/amap/bicycle-parking-map-amap.controller';
import { BicycleParkingMapController } from './controller/bicycle-parking-map.controller';

const businesses = [
  BicycleParkingMapDataBusiness,
  BicycleParkingMapStationBusiness,
  BicycleParkingMapBusiness,
];

const controllers = [
  BicycleParkingMapAMapController,
  BicycleParkingMapController,
];

export const BicycleParkingMapProviders = [...businesses, ...controllers];
