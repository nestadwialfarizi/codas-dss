'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useModal } from '~/hooks/use-modal';
import { Criteria } from '~/lib/drizzle/schema';
import { createCriteria, updateCriteria } from './actions';

const criteriaFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  type: z.string().min(1, { message: 'Required' }),
  value: z.string().min(1, { message: 'Required' }),
});

type CriteriaFormProps = {
  prevCriteria?: Criteria;
};

export function CriteriaForm({ prevCriteria }: CriteriaFormProps) {
  const { setOpen } = useModal();

  const form = useForm<z.infer<typeof criteriaFormSchema>>({
    resolver: zodResolver(criteriaFormSchema),
    defaultValues: {
      name: prevCriteria?.name ?? '',
      type: prevCriteria?.type ?? '',
      value: prevCriteria?.value.toString() ?? '',
    },
  });

  async function handleSubmit(values: z.infer<typeof criteriaFormSchema>) {
    let result;
    const context = prevCriteria ? 'memperbarui' : 'membuat';

    const parsedData = {
      name: values.name,
      type: values.type as Criteria['type'],
      value: parseInt(values.value),
    };

    if (prevCriteria) {
      result = await updateCriteria(prevCriteria.id, parsedData);
    } else {
      result = await createCriteria(parsedData);
    }

    if (result.success) {
      setOpen(false);
      toast(`Berhasil ${context} data!`, {
        description: result.message,
      });
    } else {
      toast(`Gagal ${context} data!`, { description: result.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex flex-col gap-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. Banyak Pilihan Amplifier'
                    {...field}
                  />
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
                    <SelectItem value='benefit'>Benefit</SelectItem>
                    <SelectItem value='cost'>Cost</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Button
            type='submit'
            className='mt-4'
            disabled={!form.formState.isDirty && !!prevCriteria}
          >
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
}
