'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/components/ui/alert-dialog';

type ConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  trigger?: React.ReactElement;
  title?: string;
  description?: string;
};

export function ConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  trigger,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description
              ? description
              : 'This will permanently delete this data from our server.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
