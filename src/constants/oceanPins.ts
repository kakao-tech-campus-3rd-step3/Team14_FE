import type { Pin } from "@/types/Pin";

const OCEAN_PINS: Pin[] = [
    { id: 'shipment', name: '어선', top: 90, left: 80, icon: '/ocean/shipment.svg', areaId: '' },
    { id: 'fish01', name: '물고기', top: 90, left: 60, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'fish02', name: '물고기', top: 93, left: 68, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'fish03', name: '물고기', top: 95, left: 55, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'ferry', name: '페리선', top: 80, left: 10, icon: '/ocean/ferry.svg', areaId: '' },
    { id: 'dokdo', name: '독도', top: 35, left: 95, icon: '/ocean/dokdo.svg', areaId: '' },
    { id: 'airplane', name: '비행기', top: 20, left: 10, icon: '/ocean/airplane.svg', areaId: '' },
  ] as const;

export default OCEAN_PINS;