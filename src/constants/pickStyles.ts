const PICK_STYLES = [
  { id: 'TRADITIONAL', name: '전통 문화', image: '/pickStyle/tradition.svg' },
  { id: 'ART_PERFORMANCE', name: '예술/공연', image: '/pickStyle/art.svg' },
  { id: 'RESTING', name: '휴식', image: '/pickStyle/resting.svg' },
  { id: 'NATURE', name: '자연/경관', image: '/pickStyle/nature.svg' },
  { id: 'ACTIVITY', name: '체험/참여', image: '/pickStyle/activity.svg' },
  { id: 'CITY', name: '도시', image: '/pickStyle/city.svg' },
  { id: 'PHOTOSHOT', name: '사진촬영', image: '/pickStyle/photoshot.svg' },
  { id: 'LOCAL', name: '지역특색', image: '/pickStyle/local.svg' },
  { id: 'FUNEXPERIENCE', name: '짜릿한 경험', image: '/pickStyle/funexperience.svg' },
] as const;

// PICK_STYLES의 id 값들만 허용하는 타입
export type PickStyleId = (typeof PICK_STYLES)[number]['id'];

export default PICK_STYLES;
