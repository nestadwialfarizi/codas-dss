import { PageHeader } from 'src/components/page-header';
import { CriteriaSelector } from 'src/features/scoring-scales/criteria-selector';
import { ScoringScaleDataTable } from 'src/features/scoring-scales/scoring-scale-data-table';
import { CreateScoringScaleDialog } from 'src/features/scoring-scales/create-scoring-scale-dialog';

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
