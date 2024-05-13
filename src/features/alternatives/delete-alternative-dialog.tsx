import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { ConfirmDialog } from '~/components/confirm-dialog';

type DeleteAlternativeDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  alternativeId: string;
};

export function DeleteAlternativeDialog({
  isOpen,
  onOpenChange,
  alternativeId,
}: DeleteAlternativeDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.alternative.delete.useMutation({
    onSuccess: (data) => {
      utils.alternative.invalidate();
      toast.success('Yeah, berhasil!', {
        description: `${data.name} berhasil dihapus.`,
      });
    },
  });

  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      action={() => mutate({ id: alternativeId })}
      isPending={isPending}
    />
  );
}
