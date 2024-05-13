'use client';

import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { ConfirmDialog } from '~/components/confirm-dialog';

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
      toast.success('Yeah, berhasil!', {
        description: `${data.description} berhasil dihapus.`,
      });
    },
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
