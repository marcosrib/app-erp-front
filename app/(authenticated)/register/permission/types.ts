import { z } from "zod";
import { permissionsSchema } from "./schema";

export type AbilitiesProps = {
 id: number;
 name: 'string',
 hasAbilityProfile: boolean;
}
export type PermissionsProps = {
    name: string;
    abilities: AbilitiesProps[];
} 
export type AbilityIdsProps = {
    id: number;
}

export type SelectedAbilitiesProps = {
    id: number;
    checked: boolean;
   }

export type PermissionsTypeSchema = z.infer<typeof permissionsSchema>