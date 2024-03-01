import { PageHeader } from '~/components/common/page-header';
import { CriteriaDataTable } from '~/features/criterias/criteria-data-table';
import { CreateCriteriaDialog } from '~/features/criterias/create-criteria-dialog';

export const metadata = {
  title: 'Criterias',
};

export default function CriteriaPage() {
  return (
    <section>
      <PageHeader
        heading='Criterias'
        description='List of criteria data, additions and changes can also be made.'
      >
        <CreateCriteriaDialog />
      </PageHeader>
      <CriteriaDataTable />
    </section>
  );
}
