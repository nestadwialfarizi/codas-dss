'use client';

import { useId } from 'react';
import type { ScoringScale } from '@prisma/client';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { DialogWrapper } from '~/components/common/dialog-wrapper';
import {
  ScoringScaleForm,
  type ScoringScaleFormValues,
} from './scoring-scale-form';
import { useCriteriaRef } from './use-criteria-ref';

type UpdateScoringScaleDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  scoringScale: ScoringScale;
};

export function UpdateScoringScaleDialog({
  isOpen,
  onClose,
  scoringScale,
}: UpdateScoringScaleDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();
  const { criteria } = useCriteriaRef();

  const { mutate: updateScoringScale } = trpc.scoringScale.update.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.description} was successfully updated.`,
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

  function handleSubmit(formValues: ScoringScaleFormValues) {
    updateScoringScale({
      id: scoringScale.id,
      data: {
        description: formValues.description,
        value: parseInt(formValues.value),
        criteriaId: criteria.id,
      },
    });
  }

  return (
    <DialogWrapper
      isOpen={isOpen}
      onOpenChange={onClose}
      title={`Update ${scoringScale.description}`}
      description='Make change to this data, click update when finished.'
      formId={formId}
      submitButtonText='Update'
    >
      <ScoringScaleForm
        id={formId}
        onSubmit={handleSubmit}
        prevScoringScale={scoringScale}
      />
    </DialogWrapper>
  );
}
