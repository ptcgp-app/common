import { Static, Type } from '@sinclair/typebox';

// Rarity
export const RaritySchema = Type.Union([
  Type.Literal('one_diamond'),
  Type.Literal('two_diamond'),
  Type.Literal('three_diamond'),
  Type.Literal('four_diamond'),
  Type.Literal('one_star'),
  Type.Literal('two_star'),
  Type.Literal('three_star'),
  Type.Literal('crown'),
]);
export type Rarity = Static<typeof RaritySchema>;

// Rarity Data
export const RarityDataSchema = Type.Object({
  id: RaritySchema,
  name: Type.String(),
  symbol: Type.String(),
  image_url: Type.String(),
});
export type RarityData = Static<typeof RarityDataSchema>;

// Card Category
export const CardCategorySchema = Type.Union([Type.Literal('pokemon'), Type.Literal('trainer')]);
export type CardCategory = Static<typeof CardCategorySchema>;

// Card Category Data
export const CardCategoryDataSchema = Type.Object({
  id: CardCategorySchema,
  name: Type.String(),
});
export type CardCategoryData = Static<typeof CardCategoryDataSchema>;

// Pokémon Type
export const PokemonTypeSchema = Type.Union([
  Type.Literal('grass'),
  Type.Literal('fire'),
  Type.Literal('water'),
  Type.Literal('lightning'),
  Type.Literal('psychic'),
  Type.Literal('fighting'),
  Type.Literal('darkness'),
  Type.Literal('metal'),
  Type.Literal('dragon'),
  Type.Literal('colorless'),
]);
export type PokemonType = Static<typeof PokemonTypeSchema>;

// Pokémon Type Data
export const PokemonTypeDataSchema = Type.Object({
  id: PokemonTypeSchema,
  name: Type.String(),
  image_url: Type.String(),
});
export type PokemonTypeData = Static<typeof PokemonTypeDataSchema>;

// Trainer Type
export const TrainerTypeSchema = Type.Union([
  Type.Literal('item'),
  Type.Literal('supporter'),
  Type.Literal('pokemon_tool'),
]);
export type TrainerType = Static<typeof TrainerTypeSchema>;

// Trainer Type Data
export const TrainerTypeDataSchema = Type.Object({
  id: TrainerTypeSchema,
  name: Type.String(),
  image_url: Type.String(),
});
export type TrainerTypeData = Static<typeof TrainerTypeDataSchema>;

// Card Type
export const CardTypeSchema = Type.Union([PokemonTypeSchema, TrainerTypeSchema]);
export type CardType = Static<typeof CardTypeSchema>;

// Card Tag
export const CardTagSchema = Type.String();
export type CardTag = Static<typeof CardTagSchema>;

// Card Tag Data
export const CardTagDataSchema = Type.Object({
  name: CardTagSchema,
  description: Type.String(),
});
export type CardTagData = Static<typeof CardTagDataSchema>;

// Expansion
export const ExpansionSchema = Type.String();
export type Expansion = Static<typeof ExpansionSchema>;

// Expansion Type
export const ExpansionTypeSchema = Type.Union([Type.Literal('set'), Type.Literal('promo')]);
export type ExpansionType = Static<typeof ExpansionTypeSchema>;

// Expansion Data
export const ExpansionDataSchema = Type.Object({
  id: Type.String(),
  official_id: Type.String(),
  name: Type.String(),
  type: ExpansionTypeSchema,
  logo_url: Type.String(),
  icon_url: Type.String(),
});
export type ExpansionData = Static<typeof ExpansionDataSchema>;

// Pack
export const PackSchema = Type.String();
export type Pack = Static<typeof PackSchema>;

// Pack Rates
export const PackRatesSchema = Type.Object({
  regular_pack: Type.Object({
    first_three_cards: Type.Partial(Type.Record(RaritySchema, Type.Number())),
    fourth_card: Type.Partial(Type.Record(RaritySchema, Type.Number())),
    fifth_card: Type.Partial(Type.Record(RaritySchema, Type.Number())),
  }),
  rare_pack: Type.Object({
    all_cards: Type.Partial(Type.Record(RaritySchema, Type.Number())),
  }),
});
export type PackRates = Static<typeof PackRatesSchema>;

// Pack Data
export const PackDataSchema = Type.Object({
  id: PackSchema,
  expansion: ExpansionSchema,
  name: Type.String(),
  image_url: Type.String(),
  ex_card: Type.String(),
  rates: PackRatesSchema,
});
export type PackData = Static<typeof PackDataSchema>;

// Pokémon Stage
export const PokemonStageSchema = Type.Union([Type.Literal('basic'), Type.Literal('stage_1'), Type.Literal('stage_2')]);
export type PokemonStage = Static<typeof PokemonStageSchema>;

// Pokémon Stage Data
export const PokemonStageDataSchema = Type.Object({
  id: PokemonStageSchema,
  name: Type.String(),
});
export type PokemonStageData = Static<typeof PokemonStageDataSchema>;

// Card
const BaseCardSchema = Type.Object({
  id: Type.String(),
  expansion: ExpansionSchema,
  name: Type.String(),
  image_url: Type.String(),
  alternate_ids: Type.Optional(Type.Array(Type.String())),
  tags: Type.Optional(Type.Array(CardTagSchema)),
  is_alternate: Type.Boolean(),
});
type BaseCard = Static<typeof BaseCardSchema>;

const BasePokemonCardSchema = Type.Intersect([
  BaseCardSchema,
  Type.Object({
    category: Type.Literal('pokemon'),
    type: PokemonTypeSchema,
    stage: PokemonStageSchema,
    hp: Type.Number(),
    retreat_cost: Type.Number(),
    abilities: Type.Optional(Type.Array(Type.Object({ name: Type.String(), effect: Type.String() }))),
    attacks: Type.Optional(
      Type.Array(
        Type.Object({
          name: Type.String(),
          cost: Type.Array(Type.String()),
          damage: Type.String(),
          effect: Type.Optional(Type.String()),
        }),
      ),
    ),
    weaknesses: Type.Optional(Type.Array(Type.Object({ type: Type.String(), value: Type.String() }))),
  }),
]);
type BasePokemonCard = Static<typeof BasePokemonCardSchema>;

const BaseTrainerCardSchema = Type.Intersect([
  BaseCardSchema,
  Type.Object({
    category: Type.Literal('trainer'),
    type: TrainerTypeSchema,
    description: Type.String(),
  }),
]);
type BaseTrainerCard = Static<typeof BaseTrainerCardSchema>;

const SetPokemonCardSchema = Type.Intersect([
  BasePokemonCardSchema,
  Type.Object({
    rarity: RaritySchema,
    packs: Type.Array(PackSchema),
    probabilities: Type.Optional(Type.Record(PackSchema, Type.Number())),
  }),
]);
type SetPokemonCard = Static<typeof SetPokemonCardSchema>;

const PromoPokemonCardSchema = Type.Intersect([
  BasePokemonCardSchema,
  Type.Object({
    promotion: Type.String(),
  }),
]);
type PromoPokemonCard = Static<typeof PromoPokemonCardSchema>;

const SetTrainerCardSchema = Type.Intersect([
  BaseTrainerCardSchema,
  Type.Object({
    rarity: RaritySchema,
    packs: Type.Array(PackSchema),
    probabilities: Type.Optional(Type.Record(PackSchema, Type.Number())),
  }),
]);
type SetTrainerCard = Static<typeof SetTrainerCardSchema>;

const PromoTrainerCardSchema = Type.Intersect([
  BaseTrainerCardSchema,
  Type.Object({
    promotion: Type.String(),
  }),
]);
type PromoTrainerCard = Static<typeof PromoTrainerCardSchema>;

export const PokemonCardSchema = Type.Union([SetPokemonCardSchema, PromoPokemonCardSchema]);
export type PokemonCard = Static<typeof PokemonCardSchema>;

export const TrainerCardSchema = Type.Union([SetTrainerCardSchema, PromoTrainerCardSchema]);
export type TrainerCard = Static<typeof TrainerCardSchema>;

export const CardSchema = Type.Union([PokemonCardSchema, TrainerCardSchema]);
export type Card = Static<typeof CardSchema>;

export const SetCardSchema = Type.Union([SetPokemonCardSchema, SetTrainerCardSchema]);
export type SetCard = Static<typeof SetCardSchema>;

export const PromoCardSchema = Type.Union([PromoPokemonCardSchema, PromoTrainerCardSchema]);
export type PromoCard = Static<typeof PromoCardSchema>;

// Mission Type
export const MissionTypeSchema = Type.Union([Type.Literal('deck'), Type.Literal('dex'), Type.Literal('collection')]);
export type MissionType = Static<typeof MissionTypeSchema>;

// Mission Type Data
export const MissionTypeDataSchema = Type.Object({
  id: MissionTypeSchema,
  name: Type.String(),
});
export type MissionTypeData = Static<typeof MissionTypeDataSchema>;

// Mission Constraint
export const MissionConstraintSchema = Type.Union([Type.Literal('any'), Type.Literal('distinct')]);
export type MissionConstraint = Static<typeof MissionConstraintSchema>;

// Mission Requirement
export const MissionRequirementSchema = Type.Object({
  total_needed: Type.Number(),
  constraint: MissionConstraintSchema,
  card_ids: Type.Array(Type.String()),
});
export type MissionRequirement = Static<typeof MissionRequirementSchema>;

// Mission
export const MissionSchema = Type.Object({
  id: Type.String(),
  expansion: Type.String(),
  name: Type.String(),
  type: MissionTypeSchema,
  is_secret: Type.Boolean(),
  rewards: Type.Array(Type.String()),
  requirements: Type.Array(MissionRequirementSchema),
});
export type Mission = Static<typeof MissionSchema>;

// Type Guards
export function isPromoCard(card: Card): card is PromoCard {
  return 'promotion' in card;
}

export function isSetCard(card: Card): card is SetCard {
  return 'rarity' in card;
}

export function isPokemonCard(card: Card): card is PokemonCard {
  return card.category === 'pokemon';
}

export function isTrainerCard(card: Card): card is TrainerCard {
  return card.category === 'trainer';
}
