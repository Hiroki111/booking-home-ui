import { createMockService } from '../../testUtil/mockData/service';

export const blowDry = createMockService({
  id: 1,
  name: 'Blow Dry',
  serviceTypeId: 1,
  minutes: 40,
  price: 35.0,
  tax: 5.0,
});
export const eyebrowsWax = createMockService({
  id: 2,
  name: 'Eyebrows Wax',
  serviceTypeId: 1,
  minutes: 30,
  price: 45.0,
  tax: 5.0,
});
export const sprayTanFullBody = createMockService({
  id: 3,
  name: 'Spray Tan Full Body',
  serviceTypeId: 1,
  minutes: 20,
  price: 30.0,
  tax: 0.0,
});
export const gelShapeandPaintFeet = createMockService({
  id: 4,
  name: 'Gel Shape and Paint Feet (No gel removal needed)',
  serviceTypeId: 2,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const gelShapeandPaintHands = createMockService({
  id: 5,
  name: 'Gel Shape and Paint Hands (No gel removal needed)',
  serviceTypeId: 2,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const fullhandnailartaddon = createMockService({
  id: 6,
  name: 'Full hand nail art add on',
  serviceTypeId: 2,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const cutBlowDry = createMockService({
  id: 7,
  name: 'Cut+Blow Dry',
  serviceTypeId: 3,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const cutBlowDryAddOn = createMockService({
  id: 8,
  name: 'Cut + Blow Dry [AddOn]',
  serviceTypeId: 3,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const cutBlowDryClour = createMockService({
  id: 9,
  name: 'Cut + Blow Dry + Clour',
  serviceTypeId: 3,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const fullColour = createMockService({
  id: 10,
  name: 'Full Colour',
  serviceTypeId: 4,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const partialFoilHighlights = createMockService({
  id: 11,
  name: 'Partial Foil Highlights',
  serviceTypeId: 4,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const colourConsultationColourExpert = createMockService({
  id: 12,
  name: 'Colour Consultation Colour Expert',
  serviceTypeId: 4,
  minutes: 20,
  price: 30.5,
  tax: 0.0,
});
export const obagiSkinCareConsultation = createMockService({
  id: 13,
  name: 'Obagi Skin Care Consultation',
  serviceTypeId: 5,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const teenagerFacial = createMockService({
  id: 14,
  name: 'Teenager Facial',
  serviceTypeId: 5,
  minutes: 30,
  price: 45.55,
  tax: 5.0,
});
export const bespokeFacialwithSkinSpecialist = createMockService({
  id: 15,
  name: 'Bespoke Facial with Skin Specialist',
  serviceTypeId: 5,
  minutes: 80,
  price: 30.5,
  tax: 0.0,
});
export const packageLashes = createMockService({
  id: 16,
  name: 'Package Lashes',
  serviceTypeId: 6,
  minutes: 40,
  price: 35.5,
  tax: 5.0,
});
export const fullSetSemiPermanentLashes = createMockService({
  id: 17,
  name: 'Full Set Semi Permanent Lashes',
  serviceTypeId: 6,
  minutes: 120,
  price: 45.55,
  tax: 5.0,
});
export const halfSetSemiPermanentLashe = createMockService({
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
