import { Static, Type } from '@sinclair/typebox';

// Collection
export const CollectionSchema = Type.Object({
  id: Type.String(),
  cards: Type.Record(Type.String(), Type.Number()),
  userId: Type.String(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type Collection = Static<typeof CollectionSchema>;

// Deck
export const DeckSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  cards: Type.Record(Type.String(), Type.Number()),
  energyTypes: Type.Array(Type.String()),
  highlightCardIds: Type.Array(Type.String()),
  userId: Type.String(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type Deck = Static<typeof DeckSchema>;

// Pack Analysis
export const PackAnalysisSchema = Type.Object({
  pack: Type.String(),
  new_card_probability: Type.Number(),
  total_cards: Type.Number(),
  missing_cards: Type.Number(),
  missing_by_rarity: Type.Record(Type.String(), Type.Number()),
  top_priority_cards: Type.Array(Type.Any()),
});
export type PackAnalysis = Static<typeof PackAnalysisSchema>;
