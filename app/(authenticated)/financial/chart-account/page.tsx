import { Tabs } from '../../components/Tabs';
import ChartAccountsGroupList from '../group-chart-account/_components/ChartAccountsGroupList';

type SearchParamsProps = {
  searchParams: { label: string; tabIndex: number };
};
function Test() {
  return (
    <>
      <div>test</div>
    </>
  );
}

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
          label="Planos de contas"
        />
      </Tabs.TabHeader>
      <Tabs.TabContent searchParams={searchParams}>
        <ChartAccountsGroupList />
        <Test />
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
