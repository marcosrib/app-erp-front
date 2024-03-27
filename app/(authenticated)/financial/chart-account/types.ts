import { z } from "zod";
import { chartAccountFilterSchema, chartAccountSchema } from "./schemas/chartAccountSchema";

export type ChartAccountsGroupProps = {
  id: number;
  name: string;
};

export type SelectTypeOptionsProps = {
  value: string,
  label: string,
}

export type SelectChartAccountOptionsProps = {
  value: number,
  label: string,
}
  
export type ChartAccountEditProps = {
  id: number;
  name: string;
  type: SelectTypeOptionsProps;
  chartAccountsGroup: ChartAccountsGroupProps
};

export type ChartAccountSearchParamProps = {
  searchParams?: { name: string };
};

export type chartAccountTypeSchema = z.infer<
  typeof chartAccountSchema
>;

export type chartAccountFilterTypeSchema = z.infer<
  typeof chartAccountFilterSchema
>;
