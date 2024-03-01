import { z } from "zod";


export type ChartAccountsGroupProps = {
    id: number;
    name: string;
};
export type SelectTypeOptionsProps = {
    value: string,
    label: string,
}
  
export type AccountPayableEditProps = {
    id: number;
    name: string;
    type: SelectTypeOptionsProps;
    chartAccountsGroup: ChartAccountsGroupProps
};

export type AccountPayableSearchParamProps = {
    searchParams?: { status: string };
}
