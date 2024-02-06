import { PageHeader } from 'src/components/page-header';
import { CreateCriteriaDialog } from 'src/features/criterias/create-criteria-dialog';
import { CriteriaDataTable } from 'src/features/criterias/criteria-data-table';

export default function CriteriaPage() {
  return (
    <>
      <PageHeader
        heading='Criterias'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quis!'
      >
        <CreateCriteriaDialog />
      </PageHeader>
      <CriteriaDataTable />
    </>
  );
}
