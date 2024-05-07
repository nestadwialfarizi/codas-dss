'use client';

import { ConfirmDialog } from '~/components/confirm-dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';

type DeleteScoringScaleDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  scoringScaleId: number;
};

export function DeleteScoringScaleDialog({
  isOpen,
  onOpenChange,
  scoringScaleId,
}: DeleteScoringScaleDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.scoringScales.delete.useMutation({
    onSuccess: (data) => {
      utils.scoringScales.invalidate();
      toastSuccess(`${data.description} berhasil dihapus.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      action={() => mutate({ id: scoringScaleId })}
      isPending={isPending}
    />
  );
}
