import type { Pin } from "@/types/Pin";

const MAP_PINS: Pin[] = [
    { id: 'seoul', name: '서울', top: 20, left: 33, icon: '/area/seoul.svg', areaId: '1' },
    { id: 'incheon', name: '인천', top: 24, left: 22, icon: '/area/incheon.svg', areaId: '2' },
    { id: 'gyeonggi', name: '경기', top: 26, left: 45, icon: '/area/gyeonggi.svg', areaId: '31' },
    { id: 'gangwon', name: '강원', top: 18, left: 65, icon: '/area/gangwon.svg', areaId: '32' },
    { id: 'daejeon', name: '대전', top: 44, left: 40, icon: '/area/daejeon.svg', areaId: '3' },
    { id: 'chungbuk', name: '충북', top: 35, left: 48, icon: '/area/chungbuk.svg', areaId: '33' },
    { id: 'chungnam', name: '충남', top: 45, left: 28, icon: '/area/chungnam.svg', areaId: '34' },
    { id: 'gwanju', name: '광주', top: 68, left: 28, icon: '/area/gwanju.svg', areaId: '5' },
    { id: 'jeonbuk', name: '전북', top: 63, left: 38, icon: '/area/jeonbuk.svg', areaId: '35' },
    { id: 'jeonnam', name: '전남', top: 78, left: 30, icon: '/area/jeonnam.svg', areaId: '36' },
    { id: 'gyeongbuk', name: '경북', top: 42, left: 70, icon: '/area/gyeongbuk.svg', areaId: '37' },
    { id: 'daegue', name: '대구', top: 54, left: 68, icon: '/area/daegue.svg', areaId: '4' },
    { id: 'gyeongnam', name: '경남', top: 62, left: 58, icon: '/area/gyeongnam.svg', areaId: '38' },
    { id: 'ulsan', name: '울산', top: 58, left: 85, icon: '/area/ulsan.svg', areaId: '7' },
    { id: 'buan', name: '부산', top: 65, left: 80, icon: '/area/buan.svg', areaId: '6' },
    { id: 'jeju', name: '제주', top: 90, left: 30, icon: '/area/jeju.svg', areaId: '39' },
  ] as const;

export default MAP_PINS;
