import { useId } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';
import { Criteria } from '~/server/drizzle/schema';
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

  const { mutate, isPending } = trpc.criterias.update.useMutation({
    onSuccess: () => {
      utils.criterias.invalidate();
      onOpenChange();
      toastSuccess(`${criteria.name} berhasil diperbarui.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah {criteria.name}</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            eaque.
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
