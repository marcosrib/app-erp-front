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

export type SearchParamProps = {
  searchParams?: { name: string };
};
export type costCenterTypeSchema = z.infer<typeof costCenterSchema>;
