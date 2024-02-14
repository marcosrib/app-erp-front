import { Tabs } from '../../components/Tabs';
import CostCenterList from '../cost-center/_components/CostCenterList';

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
        <CostCenterList />
        <Test />
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
