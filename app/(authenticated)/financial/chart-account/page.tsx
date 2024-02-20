import { Tabs } from '../../components/Tabs';
import ChartAccountsGroup from '../group-chart-account/ChartAccountsGroup';

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
          label="Plano de contas"
        />
      </Tabs.TabHeader>
      <Tabs.TabContent searchParams={searchParams}>
        <ChartAccountsGroup />
        <Test />
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
