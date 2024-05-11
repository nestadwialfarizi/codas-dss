'use client';

import { useId } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import { toast } from 'sonner';

import { toastError, toastSuccess, trpc } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';

import { ScoringScaleForm } from './scoring-scale-form';

export function CreateScoringScaleButton() {
  const formId = useId();
  const utils = trpc.useUtils();

  const { isOpen, toggle, close } = useDisclosure();

  const { mutate, isPending } = trpc.scoringScale.create.useMutation({
    onSuccess: (data) => {
      utils.scoringScale.invalidate();
      close();
      toast.success('Yeah, berhasil!', {
        description: `${data.description} berhasil ditambahkan.`,
      });
    },
    onError: (error) => {
      toast.error('Oops, terjadi kesalahan!', {
        description: error.message,
      });
    },
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
