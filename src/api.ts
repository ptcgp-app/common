import { Static, Type } from '@sinclair/typebox';

// Query Options
export const QueryOptionsSchema = Type.Object({
  filter: Type.Optional(Type.String()),
  sort: Type.Optional(Type.String()),
  fields: Type.Optional(Type.String()),
  offset: Type.Optional(Type.String()),
  limit: Type.Optional(Type.String()),
  search: Type.Optional(Type.String()),
});
export type QueryOptions = Static<typeof QueryOptionsSchema>;

export interface InternalQueryOptions extends QueryOptions {
  defaultSort?: string;
}

export const SingleObjectQueryOptionsSchema = Type.Object({
  fields: Type.Optional(Type.String()),
});
export type SingleObjectQueryOptions = Static<typeof SingleObjectQueryOptionsSchema>;

export const NonPaginatedQueryOptionsSchema = Type.Object({
  filter: Type.Optional(Type.String()),
  sort: Type.Optional(Type.String()),
  fields: Type.Optional(Type.String()),
});
export type NonPaginatedQueryOptions = Static<typeof NonPaginatedQueryOptionsSchema>;

export const PaginatedMetadataSchema = Type.Object({
  total: Type.Number(),
  count: Type.Number(),
  offset: Type.Number(),
  limit: Type.Number(),
});
export type PaginatedMetadata = Static<typeof PaginatedMetadataSchema>;

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
  mission_card_probability: Type.Number(),
  deck_card_probability: Type.Number(),
  total_cards: Type.Number(),
  missing_cards: Type.Number(),
  missing_by_rarity: Type.Record(Type.String(), Type.Number()),
  top_priority_cards: Type.Array(Type.Any()),
});
export type PackAnalysis = Static<typeof PackAnalysisSchema>;
