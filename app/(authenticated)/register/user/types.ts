import { z } from "zod"
import { userFormSchema } from "./hooks/schema"
import { userEditSchema } from "./schemas/userEditSchema"

export type ProfileProps = {
    id: number,
    name: string,
  }
  
export type SelectProfileOptionsProps = {
  value: number,
  label: string,
}

export type UpdateSatusProps = {
  id?: number,
  status: boolean,
  
}
  
export type UserDataProps = {
    name: string,
    email: string,
    password: string,
    status: boolean,
    profiles: ProfileProps[]
}

export type UserEditProps = {
  id: number,
  name: string,
  email: string,
  password: string,
  status: boolean,
  profiles: ProfileProps[]
}

export type UserSearchDataProps = {
  email: string,
}

export type ParamsProps = {
  searchParams?: { email: string, page: string},
}

export type UserFormData = z.infer<typeof userFormSchema>

export type UserEditFormTypeSchema = z.infer<typeof userEditSchema>
