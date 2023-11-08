import { z } from "zod"
import { userFormSchema } from "./hooks/schema"

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
    id?: number,
    name: string,
    email: string,
    password: string,
    status: boolean,
    profiles: ProfileProps[]
}

export type UserFormData = z.infer<typeof userFormSchema>
