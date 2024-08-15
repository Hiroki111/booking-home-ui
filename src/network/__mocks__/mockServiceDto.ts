import { createMockServiceDto } from '../../testUtil/mockData/service';

export const blowDry = createMockServiceDto({
  id: 1,
  name: 'Blow Dry',
  serviceTypeId: 1,
  minutes: 40,
  price: 35.0,
  tax: 5.0,
});
export const eyebrowsWax = createMockServiceDto({
  id: 2,
  name: 'Eyebrows Wax',
  serviceTypeId: 1,
  minutes: 30,
  price: 45.0,
  tax: 5.0,
});
export const sprayTanFullBody = createMockServiceDto({
  id: 3,
  name: 'Spray Tan Full Body',
  serviceTypeId: 1,
  minutes: 20,
  price: 30.0,
  tax: 0.0,
});
export const gelShapeandPaintFeet = createMockServiceDto({
  id: 4,
  name: 'Gel Shape and Paint Feet (No gel removal needed)',
  serviceTypeId: 2,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const gelShapeandPaintHands = createMockServiceDto({
  id: 5,
  name: 'Gel Shape and Paint Hands (No gel removal needed)',
  serviceTypeId: 2,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const fullhandnailartaddon = createMockServiceDto({
  id: 6,
  name: 'Full hand nail art add on',
  serviceTypeId: 2,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const cutBlowDry = createMockServiceDto({
  id: 7,
  name: 'Cut+Blow Dry',
  serviceTypeId: 3,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const cutBlowDryAddOn = createMockServiceDto({
  id: 8,
  name: 'Cut + Blow Dry [AddOn]',
  serviceTypeId: 3,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const cutBlowDryClour = createMockServiceDto({
  id: 9,
  name: 'Cut + Blow Dry + Clour',
  serviceTypeId: 3,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const fullColour = createMockServiceDto({
  id: 10,
  name: 'Full Colour',
  serviceTypeId: 4,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const partialFoilHighlights = createMockServiceDto({
  id: 11,
  name: 'Partial Foil Highlights',
  serviceTypeId: 4,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const colourConsultationColourExpert = createMockServiceDto({
  id: 12,
  name: 'Colour Consultation Colour Expert',
  serviceTypeId: 4,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const obagiSkinCareConsultation = createMockServiceDto({
  id: 13,
  name: 'Obagi Skin Care Consultation',
  serviceTypeId: 5,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const teenagerFacial = createMockServiceDto({
  id: 14,
  name: 'Teenager Facial',
  serviceTypeId: 5,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const bespokeFacialwithSkinSpecialist = createMockServiceDto({
  id: 15,
  name: 'Bespoke Facial with Skin Specialist',
  serviceTypeId: 5,
  minutes: 80,
  price: 30.5,
  tax: 0.0,
});
export const packageLashes = createMockServiceDto({
  id: 16,
  name: 'Package Lashes',
  serviceTypeId: 6,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const fullSetSemiPermanentLashes = createMockServiceDto({
  id: 17,
  name: 'Full Set Semi Permanent Lashes',
  serviceTypeId: 6,
  minutes: 120,
  price: 45.55,
  tax: 5.0,
});
export const halfSetSemiPermanentLashe = createMockServiceDto({
  id: 18,
  name: 'Half Set Semi Permanent Lashes',
  serviceTypeId: 6,
  minutes: 90,
  price: 30.5,
  tax: 0.0,
});

const services = [
  blowDry,
  eyebrowsWax,
  sprayTanFullBody,
  gelShapeandPaintFeet,
  gelShapeandPaintHands,
  fullhandnailartaddon,
  cutBlowDry,
  cutBlowDryAddOn,
  cutBlowDryClour,
  fullColour,
  partialFoilHighlights,
  colourConsultationColourExpert,
  obagiSkinCareConsultation,
  teenagerFacial,
  bespokeFacialwithSkinSpecialist,
  packageLashes,
  fullSetSemiPermanentLashes,
  halfSetSemiPermanentLashe,
];

export function getServices(ids: number[]) {
  return services.filter((service) => ids.includes(service.id));
}
