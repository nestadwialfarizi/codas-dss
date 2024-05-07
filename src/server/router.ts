import { criteriaRouter } from './api/criterias';
import { createRouter } from './trpc';

export const router = createRouter({
  criterias: criteriaRouter,
});

export type Router = typeof router;
