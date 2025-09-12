// 축제 API 관련 함수들
export interface Festival {
  id: number;
  name: string;
  area: string;
  // 필요한 다른 필드들 추가
}

export interface FestivalResponse {
  festivals: Festival[];
  total: number;
}

// 현재 지역의 축제 목록 조회
export const getCurrentFestivalsByArea = async (areaId: number): Promise<FestivalResponse> => {
  try {
    const response = await fetch(`/api/festivals/area/${areaId}/current`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('축제 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

// 다른 API 함수들도 여기에 추가할 수 있습니다
export const getAllFestivals = async (): Promise<FestivalResponse> => {
  try {
    const response = await fetch('/api/festivals');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('축제 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

