import { z } from "zod";
import { accountPayableSearchSchema } from "./schemas/accountPayableSchema";


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
    searchParams?: { status: string , page:string};
}


export type accountsPayableTypeSchema = z.infer<
  typeof accountPayableSearchSchema
>;

