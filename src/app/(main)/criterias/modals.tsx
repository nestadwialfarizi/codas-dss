'use client';

import { PlusIcon } from '@radix-ui/react-icons';
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
import { useModal } from '~/hooks/use-modal';
import { Criteria } from '~/lib/drizzle/schema';

import { CriteriaForm } from './form';

export function CreateCriteria() {
  const { open, setOpen } = useModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='mr-2' />
          Buat kriteria
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
        <CriteriaForm />
      </DialogContent>
    </Dialog>
  );
}

type CriteriaDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criteria: Criteria;
};

export function CriteriaDetailModal({
  open,
  onOpenChange,
  criteria,
}: CriteriaDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat data kriteria</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            eaque.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <CriteriaForm prevCriteria={criteria} />
        </div>
        <DialogFooter>
          <Button>Simpan perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
