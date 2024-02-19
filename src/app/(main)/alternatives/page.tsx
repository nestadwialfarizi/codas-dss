'use client';

import { Fragment } from 'react';
import { PageHeader } from '~/components/common/page-header';
import { AlternativeDataTable } from '~/features/alternatives/alternative-data-table';
import { CreateAlternativeButton } from '~/features/alternatives/create-alternative-button';

export default function AlternativePage() {
  return (
    <Fragment>
      <PageHeader
        heading='Alternatives'
        description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, sequi.'
      >
        <CreateAlternativeButton />
      </PageHeader>
      <AlternativeDataTable />
    </Fragment>
  );
}
