"use client";

import { toastError, toastSuccess, trpc } from "src/lib/utils";
import { ConfirmDialog } from "src/components/confirm-dialog";

type DeleteScoringScaleDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  scoringScaleId: string;
};

export function DeleteScoringScaleDialog({
  isOpen,
  onOpenChange,
  scoringScaleId,
}: DeleteScoringScaleDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.scoringScale.delete.useMutation({
    onSuccess: (data) => {
      utils.scoringScale.invalidate();
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
