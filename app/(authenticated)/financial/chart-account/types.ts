import { z } from "zod";
import { chartAccountSchema } from "./schemas/chartAccountSchema";

export type ChartAccountsGroupProps = {
    id: number;
    name: string;
};
export type SelectTypeOptionsProps = {
    value: string,
    label: string,
  }
  
export type ChartAccountEditProps = {
    id: number;
    name: string;
    type: SelectTypeOptionsProps;
};

export type ChartAccountSearchParamProps = {
    searchParams?: { name: string };
};

export type chartAccountTypeSchema = z.infer<
  typeof chartAccountSchema
>;
