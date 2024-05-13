import { toast } from 'sonner';
import { trpc } from '~/lib/utils';
import { ConfirmDialog } from '~/components/confirm-dialog';

type DeleteCriteriaDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteriaId: string;
};

export function DeleteCriteriaDialog({
  isOpen,
  onOpenChange,
  criteriaId,
}: DeleteCriteriaDialogProps) {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.criteria.delete.useMutation({
    onSuccess: (data) => {
      utils.criteria.invalidate();
      toast.success('Yeah, berhasil!', {
        description: `${data.name} berhasil dihapus.`,
      });
    },
  });

  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      action={() => mutate({ id: criteriaId })}
      isPending={isPending}
    />
  );
}
