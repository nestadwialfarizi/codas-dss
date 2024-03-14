'use client';

import { z } from 'zod';
import type { Alternative } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { trpc } from '~/lib/trpc';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { ErrorDisplay } from '~/components/common/error-display';
import { LoadingIndicator } from '~/components/common/loading-indicator';

const alternativeFormSchema = z.object({
  name: z.string().min(1),
  evaluations: z.array(
    z.object({
      criteriaId: z.string().min(1),
      scoringScaleId: z.string().min(1),
    }),
  ),
});

export type AlternativeFormValues = z.infer<typeof alternativeFormSchema>;

type AlternativeFormProps = {
  id: string;
  onSubmit: SubmitHandler<AlternativeFormValues>;
  prevAlternative?: Alternative;
};

export function AlternativeForm({
  id,
  onSubmit,
  prevAlternative,
}: AlternativeFormProps) {
  const {
    data: criterias,
    isFetching: isFetchingCriterias,
    error: errorCriterias,
  } = trpc.criteria.get.useQuery();

  const {
    data: scoringScales,
    isFetching: isFetchingScoringScales,
    error: errorScoringScales,
  } = trpc.scoringScale.get.useQuery();

  const {
    data: evaluations,
    isFetching: isFetchingEvaluations,
    error: errorEvaluations,
  } = trpc.evaluation.get.useQuery();

  const form = useForm<AlternativeFormValues>({
    resolver: zodResolver(alternativeFormSchema),
    defaultValues: {
      name: prevAlternative?.name || '',
      evaluations: [],
    },
  });

  const isFetching =
    isFetchingCriterias || isFetchingEvaluations || isFetchingScoringScales;
  const error = errorCriterias || errorEvaluations || errorScoringScales;

  if (isFetching) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Neural DSP Quad Cortex'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Name of alternative, the name must be unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {criterias?.map((criteria, index) => {
          const scoringScalesByCriteriaId = scoringScales?.filter(
            (scoringScale) => scoringScale.criteriaId === criteria.id,
          );

          const defaultScoringScaleId = evaluations?.find(
            (evaluation) =>
              evaluation.alternativeId === prevAlternative?.id &&
              evaluation.criteriaId === criteria.id,
          )?.scoringScaleId;

          return (
            <div key={criteria.id}>
              <FormField
                control={form.control}
                name={`evaluations.${index}.criteriaId`}
                defaultValue={criteria.id}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='hidden' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`evaluations.${index}.scoringScaleId`}
                defaultValue={defaultScoringScaleId || ''}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{criteria.name}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Determine ${criteria.name} value`}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scoringScalesByCriteriaId?.map((scoringScale) => (
                          <SelectItem
                            key={scoringScale.id}
                            value={scoringScale.id}
                          >
                            {scoringScale.description} - {scoringScale.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          );
        })}
      </form>
    </Form>
  );
}
