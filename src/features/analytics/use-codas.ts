'use client';

import { trpc } from '~/lib/trpc';

export const useCodas = () => {
  const { data: alternatives } = trpc.alternative.get.useQuery();
  const { data: criterias } = trpc.criteria.get.useQuery();
  const { data: scoringScales } = trpc.scoringScale.get.useQuery();
  const { data: evaluations } = trpc.evaluation.get.useQuery();

  const decisionMatrix = [] as any;
  const normalizedMatrix = [] as any;
  const weightedNormalizedMatrix = [] as any;
  const euclidean = [] as any;
  const taxicab = [] as any;
  const relativeAssessmentMatrix = [] as any;

  // Decision Matrix
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

  // Normalized and Weighted Normalized Matrix
  alternatives?.map((alternative) =>
    criterias?.map((criteria) => {
      const value = decisionMatrix[criteria.id][alternative.id];

      const max = Math.max(
        ...Object.values(decisionMatrix[criteria.id] as number),
      );
      const min = Math.min(
        ...Object.values(decisionMatrix[criteria.id] as number),
      );

      let n;

      if (criteria.type === 'BENEFIT') {
        n = value / max;
      } else if (criteria.type === 'COST') {
        n = min / value;
      }

      if (!normalizedMatrix[criteria.id]) {
        normalizedMatrix[criteria.id] = [];
      }

      normalizedMatrix[criteria.id][alternative.id] = n;

      const r = criteria.weight! * n!;

      if (!weightedNormalizedMatrix[criteria.id]) {
        weightedNormalizedMatrix[criteria.id] = [];
      }

      weightedNormalizedMatrix[criteria.id][alternative.id] = r;
    }),
  );

  // Euclidean and Taxicab Distance
  // Ideal-Negative
  alternatives?.map((alternative) => {
    let totalE = 0;
    let totalT = 0;

    criterias?.map((criteria) => {
      const r = weightedNormalizedMatrix[criteria.id][alternative.id];
      const ns = Math.min(
        ...Object.values(weightedNormalizedMatrix[criteria.id] as number),
      );

      const e = Math.abs(r - ns);
      const t = Math.abs(r - ns);

      totalE += Math.pow(e, 2);
      totalT += t;
    });

    euclidean[alternative.id] = Math.sqrt(totalE);
    taxicab[alternative.id] = totalT;
  });

  // Relative Assessment
  alternatives?.map((alternative1) =>
    alternatives.map((alternative2) => {
      const threshold = 0.01;

      const e1 = euclidean[alternative2.id];
      const t1 = taxicab[alternative2.id];

      const e2 = euclidean[alternative1.id];
      const t2 = taxicab[alternative2.id];

      const value1 = e2 - e1;
      const value2 = e2 - e1;
      const value3 = t2 - t1;

      let value2Th;

      if (Math.abs(value2) >= threshold) {
        value2Th = '1';
      } else {
        value2Th = '0';
      }

      if (!relativeAssessmentMatrix[alternative1.id]) {
        relativeAssessmentMatrix[alternative1.id] = [];
      }

      relativeAssessmentMatrix[alternative1.id][alternative2.id] =
        value1 + value2 * value3;
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
    normalizedMatrix,
    weightedNormalizedMatrix,
    euclidean,
    taxicab,
    relativeAssessmentMatrix,
  };
};
