import { z } from 'zod';
import { costCenterSchema } from './schemas/costCenterCreateSchema';

export type CostCenterSearchProps = {
  name: string;
};

export type CostCenterEditProps = {
  id: number;
  name: string;
};

export type CostCenterCreateProps = {
  name: string;
};

export type GetCostCenterProps = {
  id: number;
  name: string;
};

export type SelectCostCenterProps = {
  value: number;
  label: string;
};

export type SearchParamProps = {
  searchParams?: { name: string };
};
export type costCenterTypeSchema = z.infer<typeof costCenterSchema>;
