export interface Festival {
  id: number;
  managerId: number | null;
  title: string;
  addr1: string;
  addr2: string;
  posterInfo: string;
  startDate: string;
  endDate: string;
  averageScore: number | null;
  wishCount: number;
}

export interface FestivalInfo extends Festival {
  overView: string;
  homePage: string;
  imageInfos: string[];
  isMyWish: boolean;
}
