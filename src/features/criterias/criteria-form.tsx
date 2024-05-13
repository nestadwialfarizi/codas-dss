'use client';

import type { Criteria } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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

const criteriaFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  type: z.string().min(1, { message: 'Required' }),
  value: z.string().min(1, { message: 'Required' }),
});

type CriteriaFormProps = {
  formId: string;
  onSubmit: SubmitHandler<Pick<Criteria, 'name' | 'type' | 'value'>>;
  prevCriteria?: Criteria;
};

export function CriteriaForm({
  formId,
  onSubmit,
  prevCriteria,
}: CriteriaFormProps) {
  const form = useForm<z.infer<typeof criteriaFormSchema>>({
    resolver: zodResolver(criteriaFormSchema),
    defaultValues: {
      name: prevCriteria?.name ?? '',
      type: prevCriteria?.type ?? '',
      value: prevCriteria?.value.toString() ?? '',
    },
  });

  async function handleSubmit(values: z.infer<typeof criteriaFormSchema>) {
    const parsedData = {
      name: values.name,
      type: values.type as Criteria['type'],
      value: parseInt(values.value),
    };
    onSubmit(parsedData);
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Banyak Pilihan Amplifier' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Tentukan tipe kriteria' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='BENEFIT'>Benefit</SelectItem>
                  <SelectItem value='COST'>Cost</SelectItem>
                </SelectContent>
              </Select>
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
                    <SelectValue placeholder='Tentukan nilai kriteria' />
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
