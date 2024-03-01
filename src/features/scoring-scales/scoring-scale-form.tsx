'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ScoringScale } from '@prisma/client';
import { type SubmitHandler, useForm } from 'react-hook-form';
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

const scoringScaleFormSchema = z.object({
  description: z.string(),
  value: z.string(),
});

export type ScoringScaleFormValues = z.infer<typeof scoringScaleFormSchema>;

type ScoringScaleFormProps = {
  id: string;
  onSubmit: SubmitHandler<ScoringScaleFormValues>;
  prevScoringScale?: Pick<ScoringScale, 'description' | 'value'>;
};

export function ScoringScaleForm({
  id,
  onSubmit,
  prevScoringScale,
}: ScoringScaleFormProps) {
  const form = useForm<ScoringScaleFormValues>({
    resolver: zodResolver(scoringScaleFormSchema),
    defaultValues: {
      description: prevScoringScale?.description || '',
      value: prevScoringScale?.value.toString() || '',
    },
  });

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Excellent' autoComplete='off' {...field} />
              </FormControl>
              <FormDescription>
                Description of scoring scale, the description must be unique for
                each criteria.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Determine scoring scale value' />
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
              <FormDescription>
                The value that will be used to evaluate alternatives.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
