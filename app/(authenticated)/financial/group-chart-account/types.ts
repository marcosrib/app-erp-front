import { z } from "zod";
import { chartAccountsGroupSchema } from "./schemas/chartAccountsGroupSchema";

export type SearchParamProps = {
  searchParams?: { name: string };
};

export type ChartAccountsGroupEditProps = {
  id: number;
  name: string;
};

export type ChartAccountsGroupProps = {
  name: string;
};

export type chartAccountsGroupTypeSchema = z.infer<
  typeof chartAccountsGroupSchema
>;
