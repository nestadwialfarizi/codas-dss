import { useId } from "react";
import type { Criteria } from "@prisma/client";

import { toastError, toastSuccess, trpc } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

import { CriteriaForm } from "./criteria-form";

type UpdateCriteriaDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  criteria: Criteria;
};

export function UpdateCriteriaDialog({
  isOpen,
  onOpenChange,
  criteria,
}: UpdateCriteriaDialogProps) {
  const formId = useId();
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.criteria.update.useMutation({
    onSuccess: () => {
      utils.criteria.invalidate();
      onOpenChange();
      toastSuccess(`${criteria.name} berhasil diperbarui.`);
    },
    onError: (error) => toastError(error.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah {criteria.name}</DialogTitle>
          <DialogDescription>
            Ubah data yang tertera pada form di bawah ini, klik simpan perubahan
            untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <CriteriaForm
          formId={formId}
          prevCriteria={criteria}
          onSubmit={(values) => mutate({ id: criteria.id, data: values })}
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
