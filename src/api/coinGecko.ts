import { Coin, ChartData,DetailedCoin } from "../types/coin";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined! Check your .env file.");
}

// TODO(zod): runtime-validate this response
 export const fetchCryptos = async (signal?: AbortSignal): Promise<Coin[]> => {
  const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`, { signal });


 if (!response.ok) {
  throw new Error("Response Error");
  
 }

const data = await response.json()

// TODO(zod): runtime-validate this response
return data as (Coin[])
 }


// TODO(zod): runtime-validate this response
export const fetchCoinData = async (id : string, signal?: AbortSignal ): Promise<DetailedCoin> => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,{ signal }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coin data");
  }

  const data = await response.json();

  // TODO(zod): runtime-validate this response
  return data as DetailedCoin
};

export const fetchChartData = async (id: string, signal?: AbortSignal ): Promise<ChartData> => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,{ signal }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }
const data = await response.json();
return  data as ChartData

};

