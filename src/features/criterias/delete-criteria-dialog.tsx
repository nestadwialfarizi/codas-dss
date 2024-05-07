import { ConfirmDialog } from '~/components/confirm-dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';

type DeleteCriteriaProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteriaId: number;
};

export function DeleteCriteria({
  isOpen,
  onOpenChange,
  criteriaId,
}: DeleteCriteriaProps) {
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
