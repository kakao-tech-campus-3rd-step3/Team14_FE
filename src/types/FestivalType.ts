export interface Festival {
  id: number;
  title: string;
  addr1: string;
  addr2: string;
  posterInfo: string;
  startDate: string;
  endDate: string;
}

export interface FestivalInfo extends Festival {
  overView: string;
  homePage: string;
  imageInfos: string[];
}
