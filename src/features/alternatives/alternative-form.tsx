import { zodResolver } from '@hookform/resolvers/zod';
import type { Alternative } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
import { getErrorMessage, trpc } from '~/lib/utils';

const alternativeFormSchema = z.object({
  name: z.string(),
  evaluations: z.array(
    z.object({
      criteriaId: z.string(),
      scoringScaleId: z.string(),
    }),
  ),
});

type AlternativeFormValues = z.infer<typeof alternativeFormSchema>;

type AlternativeFormProps = {
  open: boolean;
  onOpenChange: () => void;
  prevAlternative?: Alternative;
};

export function AlternativeForm({
  open,
  onOpenChange,
  prevAlternative,
}: AlternativeFormProps) {
  const utils = trpc.useUtils();

  const { data: criterias } = trpc.criteria.list.useQuery();
  const { data: scoringScales } = trpc.scoringScale.list.useQuery();
  const { data: evaluations } = trpc.evaluation.list.useQuery();

  const { mutateAsync: createAlternative } =
    trpc.alternative.create.useMutation();
  const { mutateAsync: updateAlternative } =
    trpc.alternative.update.useMutation();

  const form = useForm<AlternativeFormValues>({
    resolver: zodResolver(alternativeFormSchema),
    values: {
      name: prevAlternative?.name ?? '',
      evaluations: [],
    },
  });

  async function handleSubmit(formValues: AlternativeFormValues) {
    let result;

    try {
      if (prevAlternative) {
        result = await updateAlternative({
          id: prevAlternative.id,
          data: formValues,
        });
      } else {
        result = await createAlternative(formValues);
      }

      utils.alternative.invalidate();
      utils.evaluation.invalidate();
      onOpenChange();
      toast.success(
        `${result.name} berhasil ${prevAlternative ? 'diperbarui' : 'ditambahkan'}`,
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[550px] overflow-auto'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <DialogHeader>
              <DialogTitle>
                {prevAlternative
                  ? `Ubah data alternatif ${prevAlternative.name}`
                  : 'Buat data alternatif'}
              </DialogTitle>
              <DialogDescription>
                {prevAlternative
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
                      <Input placeholder='Line 6 Helix LT' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {criterias?.map((criteria, index) => {
                const filteredScoringScales = scoringScales?.filter(
                  (scoringScale) => scoringScale.criteriaId === criteria.id,
                );

                const filteredEvaluations = evaluations?.filter(
                  (evaluation) =>
                    evaluation.alternativeId === prevAlternative?.id,
                );

                const defaultValue = filteredEvaluations?.find(
                  (evaluation) => evaluation.criteriaId === criteria.id,
                );

                return (
                  <div key={criteria.id}>
                    <FormField
                      control={form.control}
                      name={`evaluations.${index}.criteriaId`}
                      defaultValue={
                        defaultValue?.criteriaId ?? criteria.id ?? ''
                      }
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
                              {filteredScoringScales?.map((scoringScale) => (
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
            </div>
            <DialogFooter>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {prevAlternative ? 'Simpan perubahan' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
