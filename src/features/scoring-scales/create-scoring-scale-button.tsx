'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useId } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { toastError, toastSuccess, trpc } from '~/lib/utils';
import { ScoringScaleForm } from './scoring-scale-form';

export function CreateScoringScaleButton() {
  const formId = useId();
  const utils = trpc.useUtils();

  const { isOpen, toggle, close } = useDisclosure();

  const { mutate, isPending } = trpc.scoringScale.create.useMutation({
    onSuccess: (data) => {
      utils.scoringScale.invalidate();
      close();
      toastSuccess(`${data.description} berhasil ditambahkan.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='mr-2' />
          Buat Skala Penilaian
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat skala penilaian</DialogTitle>
          <DialogDescription>
            Penuhi form di bawah ini, klik simpan untuk menyimpan data.
          </DialogDescription>
        </DialogHeader>
        <ScoringScaleForm
          formId={formId}
          onSubmit={(values) => mutate(values)}
        />
        <DialogFooter>
          <Button form={formId} disabled={isPending}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
