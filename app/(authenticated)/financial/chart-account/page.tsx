import { Tabs } from '../../components/Tabs';
import ChartAccountsGroup from '../group-chart-account/ChartAccountsGroup';
import ChartAccountList from './_components/ChartAccountList';
import ChartAccountSearch from './_components/ChartAccountSearch';

type SearchParamsProps = {
  searchParams: {
    label: string;
    tabIndex: number;
    name: string;
  };
};

export default function ChartAccount({ searchParams }: SearchParamsProps) {
  return (
    <Tabs.Root>
      <Tabs.TabHeader>
        <Tabs.TabHeaderContent
          searchParams={searchParams}
          label="Grupo plano de contas"
          initialPage
        />
        <Tabs.TabHeaderContent
          searchParams={searchParams}
          label="Plano de contas"
        />
      </Tabs.TabHeader>
      <Tabs.TabContent searchParams={searchParams}>
        <ChartAccountsGroup searchParams={searchParams} />
        <>
          <ChartAccountSearch />
          <ChartAccountList searchParams={searchParams} />
        </>
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
