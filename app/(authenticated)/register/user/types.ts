import { z } from "zod"
import { userFormSchema } from "./hooks/schema"
import { userEditSchema } from "./schemas/userEditSchema"
import { userCreateSchema } from "./schemas/userCreateSchema"

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

export type UserCreateTypeSchema = z.infer<typeof userCreateSchema>

export type UserEditFormTypeSchema = z.infer<typeof userEditSchema>
