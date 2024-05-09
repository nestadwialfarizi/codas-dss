"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useId } from "react";
import { useDisclosure } from "react-use-disclosure";

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

export function CreateAlternativeButton() {
  const formId = useId();
  const utils = trpc.useUtils();

  const { isOpen, toggle, close } = useDisclosure();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" />
          Buat Alternatif
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat data alternatif</DialogTitle>
          <DialogDescription>
            Penuhi form di bawah ini, klik simpan untuk menyimpan data.
          </DialogDescription>
        </DialogHeader>
        {/* <CriteriaForm formId={formId} onSubmit={(values) => mutate(values)} /> */}
        <DialogFooter>
          <Button form={formId}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
