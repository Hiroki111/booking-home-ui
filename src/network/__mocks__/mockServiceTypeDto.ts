import { ServiceTypeDto } from '../../interfaces/serviceType';
import { createMockServiceTypeDto } from '../../testUtil/mockData/serviceType';
import * as mockServices from './mockServiceDto';

export const mockServiceTypeDtos: ServiceTypeDto[] = [
  createMockServiceTypeDto({
    id: 1,
    name: 'Featured',
    services: [mockServices.blowDry, mockServices.eyebrowsWax, mockServices.sprayTanFullBody],
  }),
  createMockServiceTypeDto({
    id: 2,
    name: 'Hands and Feet',
    services: [
      mockServices.gelShapeandPaintFeet,
      mockServices.gelShapeandPaintHands,
      mockServices.fullhandnailartaddon,
    ],
  }),
  createMockServiceTypeDto({
    id: 3,
    name: 'Hair cut',
    services: [mockServices.cutBlowDry, mockServices.cutBlowDryAddOn, mockServices.cutBlowDryClour],
  }),
  createMockServiceTypeDto({
    id: 4,
    name: 'Colouring',
    services: [
      mockServices.fullColour,
      mockServices.partialFoilHighlights,
      mockServices.colourConsultationColourExpert,
    ],
  }),
  createMockServiceTypeDto({
    id: 5,
    name: 'Skin Clinic',
    services: [
      mockServices.obagiSkinCareConsultation,
      mockServices.teenagerFacial,
      mockServices.bespokeFacialwithSkinSpecialist,
    ],
  }),
  createMockServiceTypeDto({
    id: 6,
    name: 'Eyelashes',
    services: [
      mockServices.packageLashes,
      mockServices.fullSetSemiPermanentLashes,
      mockServices.halfSetSemiPermanentLashe,
    ],
  }),
];
