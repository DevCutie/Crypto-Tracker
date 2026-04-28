<img width="1261" height="702" alt="Screen Shot 2026-04-24 at 21 52 20" src="https://github.com/user-attachments/assets/e13d3dd9-67ce-47a6-9ba2-36a6d32ab244" /><br/>


<img width="1200" height="664" alt="Screen Shot 2026-04-24 at 21 52 36" src="https://github.com/user-attachments/assets/2ae3307b-638b-4806-a48d-f743b64c90d0" /><br>






🚀 CryptoTracker Pro (TypeScript Edition)
A high-performance, real-time cryptocurrency tracking dashboard built with React 18 and fully migrated to TypeScript for enterprise-grade type safety.


<hr>

🛠 Tech Stack Evolution
Frontend: React.js (Migrated from .jsx to .tsx)

Language: TypeScript (Strict Mode)

Routing: React Router v6

Data Fetching: Axios / Fetch API with CoinGecko

Charts: Recharts

Styling: Modular CSS

<hr/>

⚡ Key Features (Post-Migration)
1. Full TypeScript Integration
The entire codebase has been refactored for Type Safety. This eliminates the most common runtime errors and provides a superior developer experience through VS Code IntelliSense.

Custom Interfaces: Dedicated models for Coin, DetailedCoin, and ChartData.

Strict Props: All components (like CryptoCard) now use interface-defined props to ensure data integrity.

2. Smart Formatting Utilities
We moved all data manipulation into a standalone, type-safe utility module (formatter.ts).

Intl-based Currency: Formats raw numbers into USD currency strings automatically.

Abbreviated Market Caps: Logic to convert billions/millions into readable B and M suffixes.

3. Advanced Filtering & Sorting
A refined logic system on the Home page allows users to parse hundreds of coins instantly:

Search: Real-time filtering by name or symbol.

Multi-Criteria Sort: Sort by Rank, Price, 24h Change, or Market Cap.

4. High-Fidelity Charting
Interactive price tracking using Recharts:

Data is automatically mapped from the CoinGecko 7-day sparkline into a format recognized by the SVG line engine.

Includes custom tooltips and responsive scaling for mobile devices.


<hr>

🏗 Project ArchitectureFileRoleLanguagetypes/coin.tsThe "Contract" (Interfaces).tsapi/coinGecko.tsAPI calls & Data Fetching.tsutils/formatter.tsMathematical formatting tools.tscomponents/CryptoCard.tsxUI for individual coin cards.tsxpages/Home.tsxMain dashboard & filtering logic.tsxpages/CoinDetail.tsxDeep-dive view with chart logic.tsx

<hr>


🚦 Getting Started
Clone the repo:

Bash
git clone [https://github.com/DevCutie/Crypto-Tracker.git]


Install dependencies:

Bash
npm install

Run in development mode:

Bash
npm run dev


Type Check:

Bash
npx tsc --noEmit

