import { useId } from 'react';
import type { Alternative } from '@prisma/client';
import { toast } from 'sonner';

import { trpc } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import { AlternativeForm } from './alternative-form';

type UpdateAlternativeDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  alternative: Alternative;
};

export function UpdateAlternativeDialog({
  isOpen,
  onOpenChange,
  alternative,
}: UpdateAlternativeDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.alternative.update.useMutation({
    onSuccess: () => {
      utils.alternative.invalidate();
      onOpenChange();
      toast.success('Yeah, berhasil!', {
        description: `${alternative.name} berhasil diperbarui.`,
      });
    },
    onError: (error) => {
      toast.error('Oops, terjadi kesalahan!', {
        description: error.message,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah {alternative.name}</DialogTitle>
          <DialogDescription>
            Ubah data yang tertera pada form di bawah ini, klik simpan perubahan
            untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <AlternativeForm
          formId={formId}
          prevAlternative={alternative}
          onSubmit={(values) => mutate({ id: alternative.id, data: values })}
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
