"use client";

import type { Alternative } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { trpc } from "src/lib/utils";
import { Badge } from "src/components/ui/badge";

export function useAlternativeTableColumns() {
  const { data: criterias, isLoading: isLoadingCriterias } =
    trpc.criteria.list.useQuery();
  const { data: evaluations, isLoading: isLoadingEvaluations } =
    trpc.evaluation.list.useQuery();

  if (isLoadingCriterias || isLoadingEvaluations) {
    return undefined;
  }

  return (
    criterias &&
    evaluations &&
    ([
      {
        id: "code",
        header: () => <div className="ml-1">Kode</div>,
        cell: ({ row }) => <div className="ml-1">A{row.index + 1}</div>,
      },
      {
        accessorKey: "name",
        header: "Nama",
      },
      {
        accessorKey: "id",
        header: <div className="-ml-24 text-center">Penilaian</div>,
        cell: ({ cell }) => {
          const alternativeId = cell.getValue() as string;
          const filteredEvaluations = evaluations.filter(
            (evaluation) => evaluation.alternativeId === alternativeId
          );

          return (
            <div className="text-center">
              <Badge
                variant={
                  filteredEvaluations.length === criterias.length
                    ? "default"
                    : "destructive"
                }
              >
                {filteredEvaluations.length} penilaian dari {criterias.length}{" "}
                kriteria
              </Badge>
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        header: () => <div className="mr-1 text-right">(Opsi)</div>,
        cell: ({ row }) => (
          <div className="mr-2 text-right">
            {/* <CriteriaTableRowActions criteria={row.original} /> */}
          </div>
        ),
      },
    ] as ColumnDef<Alternative>[])
  );
}
