import { zodResolver } from '@hookform/resolvers/zod';
import type { Alternative } from '@prisma/client';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { trpc } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

const alternativeFormSchema = z.object({
  name: z.string(),
  evaluations: z.array(
    z.object({
      criteriaId: z.string(),
      scoringScaleId: z.string(),
    }),
  ),
});

type AlternativeFormProps = {
  formId: string;
  onSubmit: SubmitHandler<z.infer<typeof alternativeFormSchema>>;
  prevAlternative?: Alternative;
};

export function AlternativeForm({
  formId,
  onSubmit,
  prevAlternative,
}: AlternativeFormProps) {
  const { data: criterias } = trpc.criteria.list.useQuery();
  const { data: scoringScales } = trpc.scoringScale.list.useQuery();
  const { data: evaluations } = trpc.evaluation.list.useQuery();

  const form = useForm<z.infer<typeof alternativeFormSchema>>({
    resolver: zodResolver(alternativeFormSchema),
    defaultValues: {
      name: prevAlternative?.name ?? '',
      evaluations: [],
    },
  });

  return (
    criterias &&
    scoringScales &&
    evaluations && (
      <Form {...form}>
        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='Line 6 Helix LT' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {criterias.map((criteria, index) => {
            const filteredScoringScales = scoringScales.filter(
              (scoringScale) => scoringScale.criteriaId === criteria.id,
            );

            const defaultValue = evaluations
              .filter(
                (evaluation) =>
                  evaluation.alternativeId === prevAlternative?.id,
              )
              .find((evaluation) => evaluation.criteriaId === criteria.id);

            return (
              <div key={criteria.id}>
                <FormField
                  control={form.control}
                  name={`evaluations.${index}.criteriaId`}
                  defaultValue={defaultValue?.criteriaId ?? criteria.id ?? ''}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='hidden' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`evaluations.${index}.scoringScaleId`}
                  defaultValue={defaultValue?.scoringScaleId ?? ''}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{criteria.name}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Nilai ${criteria.name}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredScoringScales.map((scoringScale) => (
                            <SelectItem
                              key={scoringScale.id}
                              value={scoringScale.id}
                            >
                              {scoringScale.description}
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
    )
  );
}
