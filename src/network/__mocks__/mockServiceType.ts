import { ServiceType } from '../../interfaces/serviceType';
import { createMockServiceType } from '../../testUtil/mockData/serviceType';
import * as mockServices from './mockService';

export const mockServiceTypes: ServiceType[] = [
  createMockServiceType({
    id: 1,
    name: 'Featured',
    services: [mockServices.blowDry, mockServices.eyebrowsWax, mockServices.sprayTanFullBody],
  }),
  createMockServiceType({
    id: 2,
    name: 'Hands and Feet',
    services: [
      mockServices.gelShapeandPaintFeet,
      mockServices.gelShapeandPaintHands,
      mockServices.fullhandnailartaddon,
    ],
  }),
  createMockServiceType({
    id: 3,
    name: 'Hair cut',
    services: [mockServices.cutBlowDry, mockServices.cutBlowDryAddOn, mockServices.cutBlowDryClour],
  }),
  createMockServiceType({
    id: 4,
    name: 'Colouring',
    services: [
      mockServices.fullColour,
      mockServices.partialFoilHighlights,
      mockServices.colourConsultationColourExpert,
    ],
  }),
  createMockServiceType({
    id: 5,
    name: 'Skin Clinic',
    services: [
      mockServices.obagiSkinCareConsultation,
      mockServices.teenagerFacial,
      mockServices.bespokeFacialwithSkinSpecialist,
    ],
  }),
  createMockServiceType({
    id: 6,
    name: 'Eyelashes',
    services: [
      mockServices.packageLashes,
      mockServices.fullSetSemiPermanentLashes,
      mockServices.halfSetSemiPermanentLashe,
    ],
  }),
];
