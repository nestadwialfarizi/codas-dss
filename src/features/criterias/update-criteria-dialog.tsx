import { useId } from 'react';
import type { Criteria, CriteriaType } from '@prisma/client';
import { trpc } from '~/lib/trpc';
import { toast } from '~/components/ui/use-toast';
import { DialogWrapper } from '~/components/common/dialog-wrapper';
import { CriteriaForm, type CriteriaFormValues } from './criteria-form';

type UpdateCriteriaDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  criteria: Criteria;
};

export function UpdateCriteriaDialog({
  isOpen,
  onClose,
  criteria,
}: UpdateCriteriaDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate } = trpc.criteria.update.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Yeah, success!',
        description: `${data.name} was successfully updated.`,
      });
      utils.criteria.invalidate();
      close();
    },
    onError: (error) => {
      toast({
        title: 'Oops, soemthing went wrong!',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  function handleSubmit(formValues: CriteriaFormValues) {
    mutate({
      id: criteria.id,
      data: {
        name: formValues.name,
        type: formValues.type as CriteriaType,
        value: parseInt(formValues.value),
      },
    });
  }

  return (
    <DialogWrapper
      isOpen={isOpen}
      onOpenChange={onClose}
      formId={formId}
      title={`Update ${criteria.name}`}
      description='Make changes to this data, click update when finished.'
      submitButtonText='Update'
    >
      <CriteriaForm
        id={formId}
        onSubmit={handleSubmit}
        prevCriteria={criteria}
      />
    </DialogWrapper>
  );
}
