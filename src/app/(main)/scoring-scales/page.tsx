"use client";

import { trpc } from "src/lib/utils";
import { DataTable } from "src/components/data-table";
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "src/components/page-header";
import { CreateCriteriaButton } from "src/features/criterias/create-criteria-button";
import { CreateScoringScaleButton } from "src/features/scoring-scales/create-scoring-scale-button";
import { CriteriaSwitcher } from "src/features/scoring-scales/criteria-switcher";
import { scoringScaleTableColumns } from "src/features/scoring-scales/scoring-scale-table-columns";
import { useCriteriaSwitcher } from "src/features/scoring-scales/use-criteria-switcher";

export default function ScoringScalePage() {
  const { criteria } = useCriteriaSwitcher();

  const { data: criterias } = trpc.criteria.list.useQuery();
  const { data: scoringScales } = trpc.scoringScale.list.useQuery();

  const filteredScoringScales = scoringScales?.filter(
    ({ criteriaId }) => criteriaId === criteria?.id
  );

  if (!criterias?.length) return <NoCriteriasHeader />;

  return (
    filteredScoringScales && (
      <>
        <ScoringScalePageHeader length={filteredScoringScales.length} />
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-wrap items-center justify-between gap-y-4">
            <CriteriaSwitcher />
            <CreateScoringScaleButton />
          </div>
          <DataTable
            data={filteredScoringScales}
            columns={scoringScaleTableColumns}
            filter={{ columnId: "description", header: "deskripsi" }}
          />
        </div>
      </>
    )
  );
}

function NoCriteriasHeader() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderDescription>Belum ada data kriteria.</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderAction asChild>
        <CreateCriteriaButton />
      </PageHeaderAction>
    </PageHeader>
  );
}

function ScoringScalePageHeader({ length }: { length: number }) {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Skala Penilaian ({length})</PageHeaderTitle>
        <PageHeaderDescription>
          Daftar skala penilaian, tabel disajikan berdasarkan kriteria
          referensinya yang dapat diubah pada menu dropdown di bawah ini.
        </PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  );
}
