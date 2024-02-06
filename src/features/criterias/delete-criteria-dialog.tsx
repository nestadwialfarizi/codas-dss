'use client';

import type { Criteria } from '@prisma/client';

import { toast } from 'src/components/ui/use-toast';
import { ConfirmDialog } from 'src/components/confirm-dialog';

import { trpc } from 'src/lib/trpc';

type DeleteCriteriaDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  criteria: Criteria;
};

export function DeleteCriteriaDialog({
  isOpen,
  onClose,
  criteria,
}: DeleteCriteriaDialogProps) {
  const utils = trpc.useUtils();

  const { mutate: deleteCriteria } = trpc.criteria.delete.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.name} was successfully deleted.`,
      });
      utils.criteria.invalidate();
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
      onConfirm={() => deleteCriteria({ id: criteria.id })}
    />
  );
}
