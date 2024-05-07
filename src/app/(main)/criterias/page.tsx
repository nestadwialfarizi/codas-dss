import { DataTable } from '~/components/data-table';
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '~/components/page-header';
import { getCriterias } from './actions';
import { criteriaTableColumns } from './columns';
import { CreateCriteria } from './modals';

export default async function CriteriaPage() {
  const criterias = await getCriterias();

  return (
    <div>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Kriteria ({criterias.length})</PageHeaderTitle>
          <PageHeaderDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderAction asChild>
          <CreateCriteria />
        </PageHeaderAction>
      </PageHeader>

      <DataTable
        data={criterias}
        columns={criteriaTableColumns}
        filter={{ columnId: 'name', header: 'nama' }}
      />
    </div>
  );
}
