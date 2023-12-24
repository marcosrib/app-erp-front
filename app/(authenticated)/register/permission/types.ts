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

export type PermissionsFormDataProps = {
    name: string;
    abilities: AbilitiesProps[];
}

export type PermissionsTypeSchema = z.infer<typeof permissionsSchema>