import { router } from './trpc';
import { criteriaRouter } from './routers/criterias';

export const appRouter = router({
  criteria: criteriaRouter,
});

export type AppRouter = typeof appRouter;
