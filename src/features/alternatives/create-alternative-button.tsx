'use client';

import { useId } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { PlusButton } from '~/components/common/plus-button';
import { DialogWrapper } from '~/components/common/dialog-wrapper';
import { AlternativeForm } from './alternative-form';

export function CreateAlternativeButton() {
  const formId = useId();
  const utils = trpc.useUtils();
  const { isOpen, open, close } = useDisclosure();
  const onOpenChange = isOpen ? close : open;

  const { mutate } = trpc.alternative.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.name} was successfully created.`,
      });
      utils.evaluation.invalidate();
      utils.alternative.invalidate();
      close();
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
      onOpenChange={onOpenChange}
      title='Create new alternative'
      description='Fill in the form according to the alternative data you will add, click create when finished.'
      formId={formId}
      trigger={<PlusButton>New Alternative</PlusButton>}
      submitButtonText='Create'
    >
      <AlternativeForm
        id={formId}
        onSubmit={(formValues) => mutate(formValues)}
      />
    </DialogWrapper>
  );
}
