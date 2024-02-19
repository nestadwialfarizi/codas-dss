import { PageHeader } from '~/components/common/page-header';
import { CriteriaSelector } from '~/features/scoring-scales/criteria-selector';
import { ScoringScaleDataTable } from '~/features/scoring-scales/scoring-scale-data-table';
import { CreateScoringScaleDialog } from '~/features/scoring-scales/create-scoring-scale-dialog';

export default function ScoringScalePage() {
  return (
    <>
      <PageHeader
        heading='Scoring Scales'
        description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, eos.'
      />
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <CriteriaSelector />
          <CreateScoringScaleDialog />
        </div>
        <ScoringScaleDataTable />
      </div>
    </>
  );
}
