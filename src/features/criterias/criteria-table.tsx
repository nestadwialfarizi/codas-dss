'use client';

import { Fragment } from 'react';
import { DataTable } from '~/components/data-table';
import { trpc } from '~/lib/utils';
import { criteriaTableColumns } from './criteria-table-columns';

export function CriteriaTable() {
  const { data, isLoading } = trpc.criteria.list.useQuery();

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <DataTable
            data={data}
            columns={criteriaTableColumns}
            filter={{ columnId: 'name', header: 'nama' }}
          />
        )
      )}
    </Fragment>
  );
}
