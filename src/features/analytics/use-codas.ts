'use client';

import { trpc } from '~/lib/trpc';

export const useCodas = () => {
  const { data: alternatives } = trpc.alternative.get.useQuery();
  const { data: criterias } = trpc.criteria.get.useQuery();
  const { data: scoringScales } = trpc.scoringScale.get.useQuery();
  const { data: evaluations } = trpc.evaluation.get.useQuery();

  const decisionMatrix = [] as any;

  alternatives?.forEach((alternative) =>
    criterias?.forEach((criteria) => {
      const filteredEvaluations = evaluations?.filter(
        (evaluation) =>
          evaluation.alternativeId === alternative.id &&
          evaluation.criteriaId === criteria.id,
      );
      const filteredScoringScales = scoringScales?.filter(
        (scoringScale) => scoringScale.criteriaId === criteria.id,
      );

      if (!decisionMatrix[criteria.id]) {
        decisionMatrix[criteria.id] = [];
      }

      let value = 0 as any;

      if (filteredEvaluations && filteredEvaluations.length > 0) {
        if (
          filteredScoringScales?.some(
            (scoringScale) =>
              scoringScale.id === filteredEvaluations[0].scoringScaleId,
          )
        ) {
          value = scoringScales?.find(
            (scoringScale) =>
              scoringScale.id === filteredEvaluations[0].scoringScaleId,
          )?.value;
        }
      }
      decisionMatrix[criteria.id][alternative.id] = value;
    }),
  );

  return {
    data: {
      criterias,
      scoringScales,
      alternatives,
      evaluations,
    },
    decisionMatrix,
  };
};
