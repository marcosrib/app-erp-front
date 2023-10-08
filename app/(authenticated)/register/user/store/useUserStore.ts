import { create } from 'zustand'

type ProfileProps = {
    id: number,
    name: string,
}
type UserEditProps = {
    id: string,
    name: string,
    email: string,
    password: string,
    profiles: ProfileProps[]
}
 
type StoreProps = {
    userEdit: UserEditProps,
    addUserEdit: (user: UserEditProps) => void;
}

export const useUserStore = create<StoreProps>((set) => ({
  userEdit: {} as UserEditProps,
  addUserEdit: (user) =>
    set((state) => ({
      userEdit: { ...state.userEdit, ...user }, 
    })),
}))