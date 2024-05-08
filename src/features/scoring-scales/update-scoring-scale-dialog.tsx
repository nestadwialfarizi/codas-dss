'use client';

import type { ScoringScale } from '@prisma/client';
import { useId } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';
import { ScoringScaleForm } from './scoring-scale-form';

type UpdateScoringScaleDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  scoringScale: ScoringScale;
};

export function UpdateScoringScaleDialog({
  isOpen,
  onOpenChange,
  scoringScale,
}: UpdateScoringScaleDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.scoringScale.update.useMutation({
    onSuccess: () => {
      utils.scoringScale.invalidate();
      onOpenChange();
      toastSuccess(`${scoringScale.description} berhasil diperbarui.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah {scoringScale.description}</DialogTitle>
          <DialogDescription>
            Ubah data yang tertera pada form di bawah ini, klik simpan perubahan
            untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <ScoringScaleForm
          formId={formId}
          prevScoringScale={scoringScale}
          onSubmit={(values) => mutate({ id: scoringScale.id, data: values })}
        />
        <DialogFooter>
          <Button form={formId} disabled={isPending}>
            Simpan perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
