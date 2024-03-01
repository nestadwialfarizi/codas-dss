import { PageHeader } from '~/components/common/page-header';
import { AlternativeDataTable } from '~/features/alternatives/alternative-data-table';
import { CreateAlternativeButton } from '~/features/alternatives/create-alternative-button';

export const metadata = {
  title: 'Alternatives',
};

export default function AlternativePage() {
  return (
    <section>
      <PageHeader
        heading='Alternatives'
        description='A list each alternative and their evaluations. Additions and changes can also be made.'
      >
        <CreateAlternativeButton />
      </PageHeader>
      <AlternativeDataTable />
    </section>
  );
}
