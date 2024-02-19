import { router } from '../trpc';
import { criteriaRouter } from './criteria-router';
import { evaluationRouter } from './evaluation-router';
import { alternativeRouter } from './alternative-router';
import { scoringScaleRouter } from './scoring-scale-router';

export const appRouter = router({
  criteria: criteriaRouter,
  scoringScale: scoringScaleRouter,
  alternative: alternativeRouter,
  evaluation: evaluationRouter,
});

export type AppRouter = typeof appRouter;
