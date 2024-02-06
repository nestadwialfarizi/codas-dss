import { criteriaRouter } from './routers/criterias';
import { router } from './trpc';

export const appRouter = router({
  criteria: criteriaRouter,
});

export type AppRouter = typeof appRouter;
