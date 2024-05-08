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
import { useCriteriaSwitcher } from '../scoring-scales/use-criteria-switcher';
import { CriteriaForm } from './criteria-form';

export function CreateCriteriaButton() {
  const formId = useId();
  const utils = trpc.useUtils();

  const { setCriteria } = useCriteriaSwitcher();
  const { isOpen, toggle, close } = useDisclosure();

  const { mutate, isPending } = trpc.criteria.create.useMutation({
    onSuccess: (data) => {
      utils.criteria.invalidate();
      close();
      toastSuccess(`${data.name} berhasil ditambahkan.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='mr-2' />
          Buat Kriteria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat data kriteria</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            eaque.
          </DialogDescription>
        </DialogHeader>
        <CriteriaForm formId={formId} onSubmit={(values) => mutate(values)} />
        <DialogFooter>
          <Button form={formId} disabled={isPending}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
