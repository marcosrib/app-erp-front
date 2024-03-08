import { Tabs } from '../../components/Tabs';
import AccountPayable from './account-payable/AccountPayable';

type SearchParamsProps = {
  searchParams: {
    label: string;
    tabIndex: number;
    name: string;
    page: string;
    status: string;
  };
};

export default async function Releases({ searchParams }: SearchParamsProps) {
  return (
    <Tabs.Root>
      <Tabs.TabHeader>
        <Tabs.TabHeaderContent
          searchParams={searchParams}
          label="Contas a pagar"
          initialPage
        />
      </Tabs.TabHeader>
      <Tabs.TabContent searchParams={searchParams}>
        <AccountPayable searchParams={searchParams} />
        <AccountPayable />
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
