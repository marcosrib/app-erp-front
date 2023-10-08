import { z } from "zod"
import { userFormSchema } from "./schema"

export type ProfileProps = {
    id: number,
    name: string,
  }
  
  export type SelectProfileOptionsProps = {
    value: number,
    label: string,
  }
  
  export type submitUserFormDataProps = {
    id?: string,
    name: string,
    email: string,
    password: string,
    profiles: ProfileProps[]
}

export type UserFormData = z.infer<typeof userFormSchema>
