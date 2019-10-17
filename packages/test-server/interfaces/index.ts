import { LiveComponentEntity } from 'live-components-api';

export interface ICompany {
  id: string;
  name: string;
  stockSymbol: string;
  news: INewsItem[];
  logo: string;
}

export interface INewsItem {
  headline: string;
  detail: string;
  link: string;
}

export interface IStockInfo extends LiveComponentEntity {
  currentValue: number;
  info: {
    open: number;
    high: number;
    low: number;
  };
  trend: {
    direction: StockTrendDirection;
    percentage: number;
  };
}

enum StockTrendDirection {
  UP = 1,
  DOWN = 2,
}
