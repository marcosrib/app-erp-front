import { z } from "zod";
import { permissionSchema } from "./schema";

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

export type PermissionDataProps = {
    name: string;
    abilities: AbilityIdsProps[];
} 

export type PerfilProps = {
    id: number;
    name: string;
}

export type PermissionsTypeSchema = z.infer<typeof permissionSchema>