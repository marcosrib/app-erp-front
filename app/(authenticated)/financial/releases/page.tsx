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

export default function Releases({ searchParams }: SearchParamsProps) {
  console.log('params init', searchParams);
  return (
    <Tabs.Root>
      <Tabs.TabHeader>
        <Tabs.TabHeaderContent
          searchParams={searchParams}
          label="Contas a receber"
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
