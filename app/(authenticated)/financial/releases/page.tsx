import { Tabs } from '../../components/Tabs';
import AccountPayable from './account-payable/AccountPayable';

type SearchParamsProps = {
  searchParams: {
    label: string;
    tabIndex: number;
    name: string;
  };
};

export default function Releases({ searchParams }: SearchParamsProps) {
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
        <AccountPayable />
        <AccountPayable />
      </Tabs.TabContent>
    </Tabs.Root>
  );
}
