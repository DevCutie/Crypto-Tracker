
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string; 
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}


export interface DetailedCoin {
  id: string;
  name: string;
  symbol: string;
  image: { large: string }; 
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    market_cap_rank: number;
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
  };
}
export interface ChartData {
  prices: [number, number][]; 
  market_caps: [number, number][];
  total_volumes: [number, number][];
}