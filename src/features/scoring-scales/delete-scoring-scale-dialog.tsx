'use client';

import type { ScoringScale } from '@prisma/client';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { ConfirmDialog } from '~/components/common/confirm-dialog';

type DeleteScoringScaleDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  scoringScale: ScoringScale;
};

export function DeleteScoringScaleDialog({
  isOpen,
  onClose,
  scoringScale,
}: DeleteScoringScaleDialogProps) {
  const utils = trpc.useUtils();

  const { mutate: deleteScoringScale } = trpc.scoringScale.delete.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.description} was successfully deleted.`,
      });
      utils.scoringScale.invalidate();
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Oops, something went wrong!',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onOpenChange={onClose}
      onConfirm={() => deleteScoringScale({ id: scoringScale.id })}
    />
  );
}
