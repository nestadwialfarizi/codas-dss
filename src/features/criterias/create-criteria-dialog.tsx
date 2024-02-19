'use client';

import { useId } from 'react';
import type { CriteriaType } from '@prisma/client';
import { useDisclosure } from 'react-use-disclosure';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { PlusButton } from '~/components/common/plus-button';
import { DialogWrapper } from '~/components/common/dialog-wrapper';

import { CriteriaForm, type CriteriaFormValues } from './criteria-form';

export function CreateCriteriaDialog() {
  const formId = useId();
  const utils = trpc.useUtils();

  const { isOpen, open, close } = useDisclosure();

  const { mutate } = trpc.criteria.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.name} was successfully created.`,
      });
      utils.criteria.invalidate();
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

  async function handleSubmit(formValues: CriteriaFormValues) {
    mutate({
      name: formValues.name,
      type: formValues.type as CriteriaType,
      value: parseInt(formValues.value),
    });
  }

  return (
    <DialogWrapper
      isOpen={isOpen}
      onOpenChange={isOpen ? close : open}
      title='Create new criteria'
      description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, impedit!'
      trigger={<PlusButton>New Criteria</PlusButton>}
      formId={formId}
    >
      <CriteriaForm id={formId} onSubmit={handleSubmit} />
    </DialogWrapper>
  );
}
