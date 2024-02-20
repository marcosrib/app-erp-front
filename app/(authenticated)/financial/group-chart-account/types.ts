import { z } from "zod";
import { chartAccountsGroupSchema } from "./schemas/chartAccountsGroupSchema";

export type SearchParamProps = {
  searchParams?: { name: string };
};

export type ChartAccountsGroupEditProps = {
  id: number;
  name: string;
};

export type ChartAccountsGroupCreateProps = {
  name: string;
};

export type ChartAccountsGroupSearchProps = {
  name: string;
};

export type chartAccountsGroupTypeSchema = z.infer<
  typeof chartAccountsGroupSchema
>;
