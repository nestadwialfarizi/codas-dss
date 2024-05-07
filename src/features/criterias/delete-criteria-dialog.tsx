import { ConfirmDialog } from '~/components/confirm-dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';

type DeleteCriteriaDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteriaId: number;
};

export function DeleteCriteriaDialog({
  isOpen,
  onOpenChange,
  criteriaId,
}: DeleteCriteriaDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.criterias.delete.useMutation({
    onSuccess: (data) => {
      utils.criterias.invalidate();
      toastSuccess(`${data.name} berhasil dihapus.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      action={() => mutate({ id: criteriaId })}
      isPending={isPending}
    />
  );
}
