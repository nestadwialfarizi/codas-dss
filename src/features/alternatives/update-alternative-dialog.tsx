'use client';

import { useId } from 'react';
import type { Alternative } from '@prisma/client';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { DialogWrapper } from '~/components/common/dialog-wrapper';
import { AlternativeForm } from './alternative-form';

type UpdateAlternativeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  alternative: Alternative;
};

export function UpdateAlternativeDialog({
  isOpen,
  onClose,
  alternative,
}: UpdateAlternativeDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate } = trpc.alternative.update.useMutation({
    onSuccess: () => {
      toast({
        title: 'Yeah, success!',
        description: `${alternative.name} was successfully updated.`,
      });
      utils.alternative.invalidate();
      utils.evaluation.invalidate();
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
    <DialogWrapper
      isOpen={isOpen}
      onOpenChange={onClose}
      title={`Update ${alternative.name}`}
      description='Make changes to this data, click update when finished.'
      formId={formId}
      submitButtonText='Update'
    >
      <AlternativeForm
        id={formId}
        onSubmit={(formValues) =>
          mutate({
            id: alternative.id,
            data: formValues,
          })
        }
        prevAlternative={alternative}
      />
    </DialogWrapper>
  );
}
