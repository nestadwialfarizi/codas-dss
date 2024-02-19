import { z } from 'zod';
import type { Criteria } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const criteriaFormSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  value: z.string().min(1),
});

export type CriteriaFormValues = z.infer<typeof criteriaFormSchema>;

type CriteriaFormProps = {
  id: string;
  onSubmit: SubmitHandler<CriteriaFormValues>;
  prevCriteria?: Pick<Criteria, 'name' | 'type' | 'value'>;
};

export function CriteriaForm({
  id,
  onSubmit,
  prevCriteria,
}: CriteriaFormProps) {
  const form = useForm<CriteriaFormValues>({
    resolver: zodResolver(criteriaFormSchema),
    defaultValues: {
      name: prevCriteria?.name || '',
      type: prevCriteria?.type || '',
      value: prevCriteria?.value.toString() || '',
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Number of Effects'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select criteria type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='BENEFIT'>Benefit</SelectItem>
                  <SelectItem value='COST'>Cost</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                    <SelectValue placeholder='Determine criteria value' />
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
