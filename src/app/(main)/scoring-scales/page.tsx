import { PageHeader } from '~/components/common/page-header';
import { CriteriaSelector } from '~/features/scoring-scales/criteria-selector';
import { ScoringScaleDataTable } from '~/features/scoring-scales/scoring-scale-data-table';
import { CreateScoringScaleDialog } from '~/features/scoring-scales/create-scoring-scale-dialog';

export const metadata = {
  title: 'Scoring Scales',
};

export default function ScoringScalePage() {
  return (
    <section>
      <PageHeader
        heading='Scoring Scales'
        description='List of scoring scale data based on each criteria. Additions and changes can also be made.'
      />
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <CriteriaSelector />
          <CreateScoringScaleDialog />
        </div>
        <ScoringScaleDataTable />
      </div>
    </section>
  );
}
