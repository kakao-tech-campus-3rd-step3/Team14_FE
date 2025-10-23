import MAP_PINS from '@/constants/mapPins';

export const AREA_OPTIONS = MAP_PINS.map((pin) => ({
  value: pin.areaId,
  label: pin.name,
}));

export default AREA_OPTIONS;
