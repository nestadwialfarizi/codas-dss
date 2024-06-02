'use client';

import type { Criteria, CriteriaType } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { getErrorMessage, trpc } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
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

const criteriaFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  type: z.string().min(1, { message: 'Required' }),
  value: z.string().min(1, { message: 'Required' }),
});

type CriteriaFormValues = z.infer<typeof criteriaFormSchema>;

type CriteriaFormProps = {
  open: boolean;
  onOpenChange: () => void;
  prevCriteria?: Criteria;
};

export function CriteriaForm({
  open,
  onOpenChange,
  prevCriteria,
}: CriteriaFormProps) {
  const utils = trpc.useUtils();

  const form = useForm<CriteriaFormValues>({
    resolver: zodResolver(criteriaFormSchema),
    defaultValues: {
      name: prevCriteria?.name ?? '',
      type: prevCriteria?.type ?? '',
      value: prevCriteria?.value.toString() ?? '',
    },
  });

  const { mutateAsync: createCriteria } = trpc.criteria.create.useMutation();
  const { mutateAsync: updateCriteria } = trpc.criteria.update.useMutation();

  async function handleSubmit(formValues: CriteriaFormValues) {
    let result;

    const parsedData = {
      name: formValues.name,
      type: formValues.type as CriteriaType,
      value: parseInt(formValues.value),
    };

    try {
      if (prevCriteria) {
        result = await updateCriteria({
          id: prevCriteria.id,
          data: parsedData,
        });
      } else {
        result = await createCriteria(parsedData);
      }

      utils.criteria.invalidate();
      utils.scoringScale.invalidate();
      utils.evaluation.invalidate();
      onOpenChange();
      toast.success(
        `${result.name} berhasil ${prevCriteria ? 'diperbarui' : 'ditambahkan'}`,
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <DialogHeader>
              <DialogTitle>
                {prevCriteria
                  ? `Ubah data kriteria ${prevCriteria.name}`
                  : 'Buat data kriteria'}
              </DialogTitle>
              <DialogDescription>
                {prevCriteria
                  ? 'Ubah isi pada form di bawah ini, klik simpan perubahan untuk menyimpan data.'
                  : 'Penuhi form di bawah ini, klik simpan untuk menyimpan data.'}
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
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
            </div>
            <DialogFooter>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {prevCriteria ? 'Simpan perubahan' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
