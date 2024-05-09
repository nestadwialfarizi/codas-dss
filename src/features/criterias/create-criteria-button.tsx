"use client";

import { useId } from "react";
import { useDisclosure } from "react-use-disclosure";
import { PlusIcon } from "@radix-ui/react-icons";

import { toastError, toastSuccess, trpc } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";

import { useCriteriaSwitcher } from "../scoring-scales/use-criteria-switcher";
import { CriteriaForm } from "./criteria-form";

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
          <PlusIcon className="mr-2" />
          Buat Kriteria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat data kriteria</DialogTitle>
          <DialogDescription>
            Penuhi form di bawah ini, klik simpan untuk menyimpan data.
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
