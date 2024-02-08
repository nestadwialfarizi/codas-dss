import { router } from './trpc';
import { criteriaRouter } from './routers/criterias';
import { scoringScaleRouter } from './routers/scoring-scales';

export const appRouter = router({
  criteria: criteriaRouter,
  scoringScale: scoringScaleRouter,
});

export type AppRouter = typeof appRouter;
