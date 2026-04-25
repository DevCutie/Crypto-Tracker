📝 Project Audit Summary: Crypto-Tracker
What I Built
The Crypto-Tracker is a React-based web application designed to give users a high-level view of the cryptocurrency market. I integrated the CoinGecko API to fetch real-time data for the top 100 assets. The core functionality includes a dynamic dashboard where users can toggle between a Grid and List view depending on their preference.

I implemented a robust Search and Sort system, allowing users to filter coins by name or symbol and sort them by price, market cap, or 24h performance. For the detailed view, I used React Router to handle dynamic routing (/coin/:id) and integrated Recharts to visualize 7-day price trends through an interactive Line Chart. Finally, I polished the project’s "infrastructure" by setting up a professional README, securing environment variables via .env files, and cleaning up the package.json by removing 47 unused "ghost" dependencies.

What Broke
The most significant challenges occurred during the Git Audit. While trying to remove the .env file from the repository's history, I ran into several "rejected" push errors. Because I had edited the README directly on the GitHub website, my local MacBook environment fell out of sync with the online repository.

When I tried to pull the changes, Git blocked me because I had an "untracked" .env file that it was afraid to overwrite. This led to a series of merge conflicts and "non-fast-forward" errors. I also broke the API connection briefly when I swapped the hardcoded URL for import.meta.env. I realized that Vite is very sensitive to naming conventions, and the app wouldn't fetch data until I ensured the variable name started exactly with VITE_.

What I Found Hard to Understand
The concept of the Git Rebase and Force Pushing was the most difficult to grasp. It was confusing to understand why Git wouldn't just "take my files" when I told it to, and learning to navigate the "parallel universes" of different branches (Main vs. Audit) took a lot of mental effort.

Additionally, the Environment Variable workflow felt like a lot of extra steps at first. It was hard to visualize why I needed three different files (.env, .env.example, and .gitignore) just to store one API link. However, after seeing how easy it is for secrets to leak onto GitHub, I now understand that this "dance" is essential for security. Finally, understanding the Package-Lock.json—and why it changed by hundreds of lines just by deleting one dependency—showed me how complex modern software "under the hood" really is.