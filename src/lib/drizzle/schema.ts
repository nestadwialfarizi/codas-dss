import type { InferSelectModel } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const criteriaTypeEnum = pgEnum('criteria_type', ['benefit', 'cost']);

export const criterias = pgTable('criterias', {
  id: serial('id').primaryKey(),
  organizationId: varchar('organization_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  type: criteriaTypeEnum('type').notNull(),
  value: integer('value').notNull(),
  weight: doublePrecision('weight'),
});

export type Criteria = InferSelectModel<typeof criterias>;
