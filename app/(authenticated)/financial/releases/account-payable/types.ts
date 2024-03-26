import { z } from "zod";
import { accountPayableSearchSchema } from "./schemas/accountPayableSearchSchema";
import { accountPayableCreateSchema } from "./schemas/accountPayableCreateSchema";


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

export type AccountPayableCreateProps = {
    name: string;
    type: SelectTypeOptionsProps;
    chartAccountsGroup: ChartAccountsGroupProps
};

export type SelectStatusProps = {
    value: string;
    label: string;
};

export type AccountPayableSearchParamProps = {
    searchParams?: { status: string , page:string, costCenterId: number};
}


export type accountsPayableTypeSchema = z.infer<
  typeof accountPayableSearchSchema
>;

export type accountsPayableCreateTypeSchema = z.infer<
  typeof accountPayableCreateSchema
>;

