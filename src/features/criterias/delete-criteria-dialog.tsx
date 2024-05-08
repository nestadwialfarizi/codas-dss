import { ConfirmDialog } from '~/components/confirm-dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';

type DeleteCriteriaDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteriaId: string;
};

export function DeleteCriteriaDialog({
  isOpen,
  onOpenChange,
  criteriaId,
}: DeleteCriteriaDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.criteria.delete.useMutation({
    onSuccess: (data) => {
      utils.criteria.invalidate();
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
