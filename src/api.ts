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
