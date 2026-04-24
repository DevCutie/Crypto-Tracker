🚀 Crypto Tracker
A real-time cryptocurrency tracking application built with React, Vite, and the CoinGecko API. This project provides live market data, interactive price visualization, and a seamless user experience for monitoring digital assets.

✨ Features
Real-time Data: Fetches live price, market cap, and volume data directly from CoinGecko.

Dynamic Search & Filtering: Instantly filter through the top 100 cryptocurrencies by name or symbol.

Advanced Sorting: Sort assets by Rank, Price, 24h Change, or Market Cap.

Dual View Modes: Toggle between a Grid View (card-based) and List View for high-density data viewing.

Interactive Charts: 7-day price history visualization using Recharts.

Responsive Design: Optimized for a smooth experience across desktop and mobile devices.

🗺️ Navigation & Flow
The app is structured into two primary views using react-router-dom:

1. Home Dashboard (/)
Search Bar: Filter the list in real-time as you type.

Controls: Adjust the sorting order and switch between Grid/List layouts.

Crypto Cards: Displays a snapshot of each coin, including a 24h price change indicator (green for profit, red for loss).

2. Coin Detail Page (/coin/:id)
Market Stats: Detailed view of High/Low 24h prices, Circulating Supply, and Total Supply.

Price Chart: An interactive Line Chart showing the price movement over the last 7 days.

Dynamic Routing: Click any card on the Home page to navigate to that specific coin's data.

🛠️ Tech Stack
Frontend: React (Hooks: useState, useEffect, useParams)

Bundler: Vite

Routing: React Router v6

Styling: CSS3 (Flexbox/Grid)

Charts: Recharts

API: CoinGecko API

🚀 Getting Started
Follow these steps to get the project running locally on your machine:

Clone the repository:

Bash
git clone https://github.com/DevCutie/Crypto-Tracker.git
Navigate into the project directory:

Bash
cd Crypto-Tracker
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env file in the root directory and add your API base URL:

Plaintext
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
Run the development server:

Bash
npm run dev
Open in Browser:
Navigate to http://localhost:5173 to see the app in action!

📈 Future Roadmap
I am currently working on a code audit (audit/2026) to implement:

TypeScript for better type safety.

Loading Skeletons to improve perceived performance.

Error Boundaries to handle API failures gracefully.

Debouncing to optimize search performance.

Developed by [Miracle/DevCutie]