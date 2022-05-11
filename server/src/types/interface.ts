export interface DaySise {
  date: string; // 날짜
  close: string; //종가
  diff: string; //전일비
  open: string; //시가
  high: string; //고가
  low: string; //저가
  volume: string; //거래량
}

export interface Stock {
  name: string;
  code: string;
}