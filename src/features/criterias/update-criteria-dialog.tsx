import { useId } from 'react';
import type { Criteria } from '@prisma/client';
import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { CriteriaForm } from './criteria-form';

type UpdateCriteriaDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteria: Criteria;
};

export function UpdateCriteriaDialog({
  isOpen,
  onOpenChange,
  criteria,
}: UpdateCriteriaDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.criteria.update.useMutation({
    onSuccess: () => {
      utils.criteria.invalidate();
      onOpenChange();
      toast.success('Yeah, berhasil!', {
        description: `${criteria.name} berhasil diperbarui.`,
      });
    },
    onError: (error) => {
      toast.error('Oops, terjadi kesalahan!', {
        description: error.message,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah {criteria.name}</DialogTitle>
          <DialogDescription>
            Ubah data yang tertera pada form di bawah ini, klik simpan perubahan
            untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <CriteriaForm
          formId={formId}
          prevCriteria={criteria}
          onSubmit={(values) => mutate({ id: criteria.id, data: values })}
        />
        <DialogFooter>
          <Button form={formId} disabled={isPending}>
            Simpan perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
