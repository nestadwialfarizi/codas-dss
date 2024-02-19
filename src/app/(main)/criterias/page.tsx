import { PageHeader } from '~/components/common/page-header';
import { CriteriaDataTable } from '~/features/criterias/criteria-data-table';
import { CreateCriteriaDialog } from '~/features/criterias/create-criteria-dialog';

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
