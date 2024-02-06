'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';

type DialogWrapperProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  formId?: string;
  trigger?: React.ReactElement;
};

export function DialogWrapper({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  formId,
  trigger,
}: DialogWrapperProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='max-h-[550px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type={formId ? 'submit' : 'button'} form={formId}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
