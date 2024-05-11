import { createRouter } from '../trpc';

import { alternativeRouter } from './alternative';
import { criteriaRouter } from './criteria';
import { evaluationRouter } from './evaluation';
import { scoringScaleRouter } from './scoring-scale';

export const router = createRouter({
  criteria: criteriaRouter,
  scoringScale: scoringScaleRouter,
  alternative: alternativeRouter,
  evaluation: evaluationRouter,
});

export type Router = typeof router;
