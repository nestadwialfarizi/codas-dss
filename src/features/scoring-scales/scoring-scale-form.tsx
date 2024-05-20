'use client';

import type { ScoringScale } from '@prisma/client';
import { util, z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage, trpc } from '~/lib/utils';
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
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

const scoringScaleFormSchema = z.object({
  criteriaId: z.string().min(1, { message: 'Tidak boleh kosong' }),
  description: z.string().min(1, { message: 'Tidak boleh kosong' }),
  value: z.string().min(1, { message: 'Tidak boleh kosong' }),
});

type ScoringScaleFormValues = z.infer<typeof scoringScaleFormSchema>;

type ScoringScaleFormProps = {
  open: boolean;
  onOpenChange: () => void;
  prevScoringScale?: ScoringScale;
};

export function ScoringScaleForm({
  open,
  onOpenChange,
  prevScoringScale,
}: ScoringScaleFormProps) {
  const utils = trpc.useUtils();
  const { criteria, setCriteria } = useCriteriaSwitcher();
  const { data: criterias, isLoading } = trpc.criteria.list.useQuery();

  const form = useForm<ScoringScaleFormValues>({
    resolver: zodResolver(scoringScaleFormSchema),
    defaultValues: {
      description: prevScoringScale?.description ?? '',
      value: prevScoringScale?.value.toString() ?? '',
      criteriaId: prevScoringScale?.criteriaId ?? criteria?.id ?? '',
    },
  });

  const { mutateAsync: createScoringScale } =
    trpc.scoringScale.create.useMutation();
  const { mutateAsync: updateScoringScale } =
    trpc.scoringScale.update.useMutation();

  async function handleSubmit(formValues: ScoringScaleFormValues) {
    let result;

    const parsedData = {
      criteriaId: formValues.criteriaId,
      description: formValues.description,
      value: parseInt(formValues.value),
    };

    const currentCriteria = criterias?.find(
      ({ id }) => id === parsedData.criteriaId,
    );

    try {
      if (prevScoringScale) {
        result = await updateScoringScale({
          id: prevScoringScale.id,
          data: parsedData,
        });
      } else {
        result = await createScoringScale(parsedData);
      }

      utils.scoringScale.invalidate();
      onOpenChange();
      setCriteria(currentCriteria!);
      toast.success(
        `${result.description} berhasil ${prevScoringScale ? 'diperbarui' : 'ditambahkan'}`,
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  if (isLoading) return <LoadingIndicator />;

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
                {prevScoringScale
                  ? `Ubah data skala penilaian ${prevScoringScale.description}`
                  : 'Buat data skala penilaian'}
              </DialogTitle>
              <DialogDescription>
                {prevScoringScale
                  ? 'Ubah isi pada form di bawah ini, klik simpan perubahan untuk menyimpan data.'
                  : 'Penuhi form di bawah ini, klik simpan untuk menyimpan data.'}
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='criteriaId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kriteria referensi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            </div>
            <DialogFooter>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {prevScoringScale ? 'Simpan perubahan' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
