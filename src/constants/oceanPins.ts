import type { Pin } from "@/types/Pin";

const OCEAN_PINS: Pin[] = [
    { id: 'shipment', name: '어선', top: 90, left: 80, icon: '/ocean/shipment.svg', areaId: '' },
    { id: 'fish01', name: '물고기', top: 95, left: 70, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'fish02', name: '물고기', top: 98, left: 60, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'fish03', name: '물고기', top: 100, left: 66, icon: '/ocean/fish.svg', areaId: '' },
    { id: 'ferry', name: '페리선', top: 80, left: 15, icon: '/ocean/ferry.svg', areaId: '' },
    { id: 'dokdo', name: '독도', top: 30, left: 84, icon: '/ocean/dokdo.svg', areaId: '' },
    { id: 'airplane', name: '비행기', top: 30, left: 14, icon: '/ocean/airplane.svg', areaId: '' },
  ] as const;
  
export default OCEAN_PINS;