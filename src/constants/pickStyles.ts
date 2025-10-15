const PICK_STYLES = [
  { id: 'TRADITIONAL', name: '전통 문화', image: '/pickStyle/tradition.svg' },
  { id: 'ART_PERFORMANCE', name: '예술/공연', image: '/pickStyle/art.svg' },
  { id: 'FOOD', name: '먹거리', image: '/pickStyle/food.svg' },
  { id: 'NATURE', name: '자연/경관', image: '/pickStyle/nature.svg' },
  { id: 'EXPERIENCE', name: '체험/참여', image: '/pickStyle/experience.svg' },
  { id: 'TRENDY', name: '트렌디', image: '/pickStyle/trendy.svg' },
  { id: 'COMMUNITY', name: '커뮤니티', image: '/pickStyle/community.svg' },
  { id: 'LOCAL', name: '지역특색', image: '/pickStyle/local.svg' },
  { id: 'INTERNATIONAL', name: '국제', image: '/pickStyle/international.svg' },
] as const;

// PICK_STYLES의 id 값들만 허용하는 타입
export type PickStyleId = (typeof PICK_STYLES)[number]['id'];

export default PICK_STYLES;
