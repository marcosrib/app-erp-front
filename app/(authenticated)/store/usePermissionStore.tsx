import { create } from 'zustand'
import { createJSONStorage, persist,   } from 'zustand/middleware'
type PermissionType = {
  setPermissions: (permissions: any) => void;
}

type StoreProps = {
  state: {
    permissions: any;
  };
  actions: PermissionType;
}
const usePermissionStore = create(
  persist<StoreProps>(
    (set) => ({
      state: {
        permissions: [],
      },
      actions: {
        setPermissions: (permission) => {
          set((state) => ({
            state: { permissions: [...state.state.permissions, permission] },
          }));
        },
      },
    }),
    {
      name: 'permissions-storage',
      skipHydration: true,
    }
  )
);
  
  export default usePermissionStore;
  