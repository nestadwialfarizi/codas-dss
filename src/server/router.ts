import { criteriaRouter } from './api/criterias';
import { scoringScaleRouter } from './api/scoring-scales';
import { createRouter } from './trpc';

export const router = createRouter({
  criterias: criteriaRouter,
  scoringScales: scoringScaleRouter,
});

export type Router = typeof router;
