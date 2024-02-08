'use client';

import { useId } from 'react';
import { useDisclosure } from 'react-use-disclosure';

import { trpc } from 'src/lib/trpc';
import { toast } from 'src/components/ui/use-toast';
import { PlusButton } from 'src/components/plus-button';
import { DialogWrapper } from 'src/components/dialog-wrapper';

import {
  ScoringScaleForm,
  type ScoringScaleFormValues,
} from './scoring-scale-form';
import { useCriteriaRef } from './use-criteria-ref';

export function CreateScoringScaleDialog() {
  const formId = useId();
  const utils = trpc.useUtils();
  const dialog = useDisclosure();
  const { criteria } = useCriteriaRef();

  const { mutate: createScoringScale } = trpc.scoringScale.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.description} was successfully created.`,
      });
      utils.scoringScale.invalidate();
      dialog.close();
    },
    onError: (error) => {
      toast({
        title: 'Oops, something went wrong!',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  function handleSubmit(formValues: ScoringScaleFormValues) {
    createScoringScale({
      description: formValues.description,
      value: parseInt(formValues.value),
      criteriaId: criteria.id,
    });
  }

  return (
    <DialogWrapper
      isOpen={dialog.isOpen}
      onOpenChange={dialog.isOpen ? dialog.close : dialog.open}
      title='Create new scoring scale'
      description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, vel?'
      formId={formId}
      trigger={<PlusButton>New Scoring Scale</PlusButton>}
    >
      <ScoringScaleForm id={formId} onSubmit={handleSubmit} />
    </DialogWrapper>
  );
}
