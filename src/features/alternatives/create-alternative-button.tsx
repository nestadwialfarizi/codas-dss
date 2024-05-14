'use client';

import { useId } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useDisclosure } from 'react-use-disclosure';
import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
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
import { AlternativeForm } from './alternative-form';

export function CreateAlternativeButton() {
  const formId = useId();
  const utils = trpc.useUtils();
  const { isOpen, toggle, close } = useDisclosure();

  const { mutate, isPending } = trpc.alternative.create.useMutation({
    onSuccess: (data) => {
      utils.alternative.invalidate();
      utils.evaluation.invalidate();
      toast.success('Yeah, berhasil!', {
        description: `${data.name} berhasil ditambahkan.`,
      });
      close();
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
          Buat Alternatif
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[550px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Buat data alternatif</DialogTitle>
          <DialogDescription>
            Penuhi form di bawah ini, klik simpan untuk menyimpan data.
          </DialogDescription>
        </DialogHeader>
        <AlternativeForm
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
