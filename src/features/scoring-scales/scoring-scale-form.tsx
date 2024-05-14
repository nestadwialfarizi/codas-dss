'use client';

import type { ScoringScale } from '@prisma/client';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '~/lib/utils';
import { LoadingIndicator } from '~/components/loading-indicator';
import { Input } from '~/components/ui/input';
import {
  Form,
  FormControl,
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
import { useCriteriaSwitcher } from './use-criteria-switcher';

const scoringScaleFormSchema = z.object({
  criteriaId: z.string().min(1, { message: 'Tidak boleh kosong' }),
  description: z.string().min(1, { message: 'Tidak boleh kosong' }),
  value: z.string().min(1, { message: 'Tidak boleh kosong' }),
});

type ScoringScaleFormProps = {
  formId: string;
  onSubmit: SubmitHandler<
    Pick<ScoringScale, 'criteriaId' | 'description' | 'value'>
  >;
  prevScoringScale?: ScoringScale;
};

export function ScoringScaleForm({
  formId,
  onSubmit,
  prevScoringScale,
}: ScoringScaleFormProps) {
  const { criteria, setCriteria } = useCriteriaSwitcher();
  const { data: criterias, isLoading } = trpc.criteria.list.useQuery();

  const form = useForm<z.infer<typeof scoringScaleFormSchema>>({
    resolver: zodResolver(scoringScaleFormSchema),
    defaultValues: {
      criteriaId:
        prevScoringScale?.criteriaId.toString() ??
        criteria?.id.toString() ??
        '',
      description: prevScoringScale?.description ?? '',
      value: prevScoringScale?.value.toString() ?? '',
    },
  });

  function handleSubmit(values: z.infer<typeof scoringScaleFormSchema>) {
    const parsedData = {
      criteriaId: values.criteriaId,
      description: values.description,
      value: parseInt(values.value),
    };

    const currentCriteria = criterias?.find(
      ({ id }) => id === parsedData.criteriaId,
    );

    onSubmit(parsedData);
    setCriteria(currentCriteria!);
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='criteriaId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kriteria referensi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Tentukan referensi kriteria' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {criterias &&
                    criterias.map((criteria) => (
                      <SelectItem
                        key={criteria.id}
                        value={criteria.id.toString()}
                      >
                        {criteria.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. < 50 atau Support/Tidak Support'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nilai</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Tentukan nilai skala' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='4'>4</SelectItem>
                  <SelectItem value='5'>5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
