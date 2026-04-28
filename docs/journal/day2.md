Project Journal: Day 02
Date: April 28, 2026

Focus: TypeScript Migration & Interface Architecture

Status: All Systems Green 🚀

What I Built
Today was almost entirely dedicated to the "Great Migration"—shifting the project from .jsx to .tsx. While it didn't involve adding new visual features, it involved building the Type Infrastructure that will support the app as it grows.

Specifically, I:

Developed a Dual-Interface System in types/coin.ts. I realized that a "Coin" isn't just one thing; the API sends a light version for the list and a heavy, nested version for the details. Separating these into Coin and DetailedCoin saved the project from constant type conflicts.

Built a robust Utility Formatter (formatter.ts) that strictly handles currency and market cap shortening.

Implemented Strict Null Checking across the CoinDetail view. This ensures that if the API fails or is slow, the app shows a clean loading state instead of the dreaded "Cannot read property of undefined" crash.

What Broke
Honestly? Almost everything broke at some point. The biggest headache was the mismatch between the Home and Detail views. By trying to use one Coin interface for both, I accidentally broke the Home page while fixing the Detail page.

The image property was a major culprit—the list API provides a simple string, but the detail API provides a nested object (image.large). Switching between these felt like a game of whack-a-mole until I separated the interfaces. I also struggled with Module Imports; once the files were renamed to .ts, the editor’s "brain" got stuck, requiring a manual restart of the TypeScript server to recognize the new file extensions.

What I Don’t Yet Understand
While I’ve successfully silenced the red lines, I’m still a bit fuzzy on Generics in useState. I used useState<Coin[]>(null), but I want to understand more about why TypeScript needs that explicit "contract" instead of just figuring it out from the initial value.

I also want to dive deeper into Non-Null Assertions (the !). I used it to satisfy the compiler when handling URL parameters from useParams, but it feels a bit like "cheating" the system. I want to learn if there’s a more "TypeScript-native" way to handle those potentially undefined values without just telling the computer "trust me, it’s there."