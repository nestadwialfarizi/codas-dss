import { createRouter } from '../trpc';
import { criteriaRouter } from './criteria';
import { scoringScaleRouter } from './scoring-scale';

export const router = createRouter({
  criteria: criteriaRouter,
  scoringScale: scoringScaleRouter,
});

export type Router = typeof router;
