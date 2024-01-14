'use server'
import usePermissionStore from "../store/usePermissionStore";

export async function hasPermission(group: string, ability: string) {
   const { permissions } = usePermissionStore.getState().state
   console.log('permission VALIDATE',permissions);
   const permissionExists = permissions.some(
    (permission) => permission.group === group && permission.ability === ability
  );
  if (permissionExists) return true;

    return false;
   
} 