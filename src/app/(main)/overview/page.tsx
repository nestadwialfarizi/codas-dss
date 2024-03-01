import { PageHeader } from '~/components/common/page-header';

export const metadata = {
  title: 'Overview',
};

export default function OverviewPage() {
  return (
    <section>
      <PageHeader
        heading='Overview'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus porro, error earum qui sequi in!'
      />
    </section>
  );
}
