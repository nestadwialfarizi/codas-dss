'use client';

import { Alternative } from '@prisma/client';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { ConfirmDialog } from '~/components/common/confirm-dialog';

type DeleteAlternativeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  alternative: Alternative;
};

export function DeleteAlternativeDialog({
  isOpen,
  onClose,
  alternative,
}: DeleteAlternativeDialogProps) {
  const utils = trpc.useUtils();

  const { mutate } = trpc.alternative.delete.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.name} was successfully deleted.`,
      });
      utils.alternative.invalidate();
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
      onConfirm={() => mutate({ id: alternative.id })}
    />
  );
}
