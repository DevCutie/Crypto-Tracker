import { useEffect, useState } from "react"; // Removed React import as per audit
import { fetchCryptos } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";
import { Coin } from "../types/coin";

const Home = () => {
  const [cryptoList, setCryptoList] = useState<Coin[]>([]);
  const [filteredList, setFilteredList] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchCryptoData(controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [cryptoList, searchQuery, sortBy]);

  const fetchCryptoData = async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const data = await fetchCryptos(signal);
      setCryptoList(data);
      setFilteredList(data);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Home fetch aborted");
      } else {
        console.error("Home fetch error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = () => {
    if (!cryptoList) return;

    let filtered = cryptoList.filter((crypto) => {
      if (!crypto) return false;
      return (
        crypto.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    filtered.sort((a, b) => {
      if (!a || !b) return 0;
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "price":
          return (a.current_price || 0) - (b.current_price || 0);
        case "price_desc":
          return (b.current_price || 0) - (a.current_price || 0);
        case "change":
          return (
            (a.price_change_percentage_24h || 0) -
            (b.price_change_percentage_24h || 0)
          );
        case "market_cap":
          return (a.market_cap || 0) - (b.market_cap || 0);
        default:
          return (a.market_cap_rank || 0) - (b.market_cap_rank || 0);
      }
    });

    setFilteredList(filtered);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search cryptos..."
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="market_cap_rank">Rank</option>
            <option value="name">Name</option>
            <option value="price">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="change">24h Change</option>
            <option value="market_cap">Market Cap</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading crypto data.....</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredList.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
    </div>
  );
};

export default Home;
