# Star Wars Heroes Explorer

This is a React application for viewing Star Wars characters, their related films, and starships. It also provides a visual graph representation of a selected character's connections using **React Flow**.

---

## Features

- **Character List**: Fetch and display a paginated list of Star Wars characters using [sw-api.starnavi.io](https://sw-api.starnavi.io/).
- **Character Details**: Click a character to see a detailed view in a graph format:
  - Main node: selected character
  - Connections from character to films they appeared in
  - Connections from each film to starships used
- **Responsive UI**: Fully responsive layout for mobile and desktop
- **Unit Testing**: Components and hooks are covered with **Vitest**
- **Offline Testing**: All tests run without making actual API calls, using mock data

---

## Tech Stack

- **React.js** with **TypeScript**
- **React Flow** for graph visualization
- **Vitest** for unit testing
- **TailwindCSS** for styling
- **React Router** for routing
- **Vite** as the build tool and development server

---

## Installation and Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Testing, Structure, and Quality

### Running Tests

To run the complete suite of unit tests using **Vitest**:

```bash
npm test
```

Note: The tests use mocked data, so no real API requests are made.

### Project Structure

The project maintains a clear, modular structure following standard React/TypeScript conventions for scalability and maintainability:

```text
src/
├─ api/                 # API request modules
├─ components/
│   ├─ characters/      # CharacterCard, CharacterList, HeroImage
│   ├─ common/          # PaginationControls, etc.
├─ hooks/               # Custom hooks (useHeroDetails, useCharactersData)
├─ utils/               # Utility functions and mock data
├─ types/               # TypeScript type definitions
└─ App.tsx
```

### Test Coverage and Mock Data

- **Component Tests:** Located next to their components (e.g., `CharacterCard.test.tsx`, `HeroImage.test.tsx`).
- **Hook Tests:** Stored separately to test business logic isolation (e.g., `useHeroDetails.test.ts`, `useCharactersData.test.ts`).
- **Mock Data:** Available in `src/utils/mockData.ts` for fast, reliable **offline development and testing**.

### API Endpoints

The application consumes data from the following external Star Wars API endpoints:

| Resource          | Endpoint                                |
| :---------------- | :-------------------------------------- |
| **Characters**    | `https://sw-api.starnavi.io/people/`    |
| **Films**         | `https://sw-api.starnavi.io/films/`     |
| **Starships**     | `https://sw-api.starnavi.io/starships/` |
| **Documentation** | `sw-api.starnavi.io/documentation`      |

### Implementation Quality & Notes

- **Code Quality:** The code base adheres to **SOLID, DRY, and KISS** principles. Design patterns are applied where appropriate to ensure **clean, maintainable React code**.
- **Demonstration:** This project explicitly showcases **testing best practices**, strong **component and hook modularity**, and proper **TypeScript usage**.
- **Image Handling:** Character images are loaded from the Star Wars Visual Guide. A **graceful fallback mechanism** is implemented in case the image resource is missing.

## Scripts

- `npm run dev` – start development server
- `npm run build` – build production bundle
- `npm run preview` – preview production build locally

## Deployed Version

[DEPLOYMENT LINK]
