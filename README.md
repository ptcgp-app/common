# @ptcgp-app/common

Common types and utilities for PTCGP.App.

## Installation

```bash
npm install @ptcgp-app/common
# or
yarn add @ptcgp-app/common
# or
bun add @ptcgp-app/common
```

## Usage

Import types and utilities directly from the package:

```typescript
import { Card, Mission, isPokemonCard, isTrainerCard } from '@ptcgp-app/common';

// Example usage
function handleCard(card: Card) {
  if (isPokemonCard(card)) {
    // TypeScript knows this is a PokemonCard
    console.log(card.hp);
  } else if (isTrainerCard(card)) {
    // TypeScript knows this is a TrainerCard
    console.log(card.description);
  }
}
```

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Watch for changes during development
bun run dev

# Run type checking
bun run lint
```