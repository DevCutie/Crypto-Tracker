import { useEffect, useState } from "react"; // Removed React import
import { useNavigate, useParams } from "react-router-dom";
import { fetchCoinData, fetchChartData } from "../api/coinGecko";
import { formatPrice, formatMarketCap } from "../utils/formatter";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { DetailedCoin } from "../types/coin";
import { formatPriceChange } from "../utils/priceChange";

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<DetailedCoin | null>(null);
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    loadData(id, controller.signal);
    return () => controller.abort();
  }, [id]);

  const loadData = async (coinId: string, signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const [coinRes, chartRes] = await Promise.all([
        fetchCoinData(coinId, signal),
        fetchChartData(coinId, signal),
      ]);

      setCoin(coinRes);

      if (chartRes && chartRes.prices) {
        const formatted = chartRes.prices.map((price: [number, number]) => ({
          time: new Date(price[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: price[1],
        }));
        setChartData(formatted);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Fetch error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading coin data...</p>
        </div>
      </div>
    );
  }


  if (!coin) {
    return (
      <div className="app">
        <div className="no-results">
          <p>Coin not found</p>
          <button onClick={() => navigate("/")} className="back-button">
            ← Back to List
          </button>
        </div>
      </div>
    );
  }


  const { isPositive, arrow, abs } = formatPriceChange(
    coin.market_data.price_change_percentage_24h
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Coin Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>
          <button onClick={() => navigate("/")} className="back-button">
            ← Back to List
          </button>
        </div>
      </header>

      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h1>{coin.name}</h1>
              <h1 className="symbol">{coin.symbol.toUpperCase()}</h1>
            </div>
          </div>
          <span className="rank">Rank #{coin.market_data.market_cap_rank}</span>
        </div>

        <div className="coin-price-section">
          <div className="current-price">
            <h2>{formatPrice(coin.market_data.current_price.usd)}</h2>
            <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>
              {arrow} {abs}%
            </span>
          </div>

          <div className="price-ranges">
            <div className="price-range">
              <span className="range-label">24h High</span>
              <span className="range-value">
                {formatPrice(coin.market_data.high_24h.usd)}
              </span>
            </div>
            <div className="price-range">
              <span className="range-label">24h Low</span>
              <span className="range-value">
                {formatPrice(coin.market_data.low_24h.usd)}
              </span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Price Chart (7 Days)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 40, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#e0e0e0",
                }}
              />
              <Line type="monotone" dataKey="price" stroke="#ADD8E6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">${formatMarketCap(coin.market_data.market_cap.usd)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Volume (24h)</span>
            <span className="stat-value">${formatMarketCap(coin.market_data.total_volume.usd)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Circulating Supply</span>
            <span className="stat-value">{coin.market_data.circulating_supply?.toLocaleString() || "N/A"}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Supply</span>
            <span className="stat-value">{coin.market_data.total_supply?.toLocaleString() || "N/A"}</span>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
    </div>
  );
};

export default CoinDetail;