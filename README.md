Pokedex:
A modern, responsive web application to explore the Pokémon universe. Built with Next.js, this project features search, type filtering, and a personalized favorites system.


Tech Stack:
1) Next.js (App Router): Chosen for its superior performance, optimized routing, and SEO capabilities.
2) Tailwind CSS: Used for rapid, responsive UI development without the overhead of external CSS files.
3) NextAuth.js: Integrated to provide secure and seamless Google Authentication.
4) Lucide React: For lightweight, customizable icons that match the modern aesthetic.
5) React Hot Toast: To provide immediate, non-intrusive feedback for user actions like adding favorites.

Installation & Setup:

1) Clone the repository:
git clone https://github.com/mohammadsaber-net/pokedex.git

2) Install dependencies:
npm install

3) Configure Environment Variables:
GOOGLE_CLIENT_ID=**********
GOOGLE_CLIENT_SECRET=*********
NEXTAUTH_URL=****************
NEXTAUTH_SECRET=***************** 

4) Run the development server:
npm run dev

Challenges & Solutions:

1) searching:
**Challenge: The PokeAPI does not support partial name searches (e.g., searching for "Pika" instead of "Pikachu").

**Solution: Instead of making a network request for every search, I implemented a strategy to fetch the names of 1000 Pokémon upon the first search input focusing.
then I filtered this data on the client side, resulting in an instantaneous search experience and reduced API load.

2) State Synchronization Across Components:
**Challenge: The "Favorite" (Heart) icon exists in two places: the main card and the details modal. Updating one did not reflect in the other.
**Solution: I utilized Custom Browser Events to broadcast a favoritesChanged signal. Every "Heart" component listens for this signal and updates its state automatically, ensuring a consistent UI across the entire app.


Key Features: 
1) Google Auth
2) Instant Search
3) Type Filtering
4) Lazy-Loaded Animations
5) Favorites System which is protected by authentication
6) Fully Responsive


Live demo:
https://pokedex-two-zeta-24.vercel.app/
