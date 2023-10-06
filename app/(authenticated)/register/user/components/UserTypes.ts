import { SelectProfileOptions, submitUserFormDataProps } from "../hooks/types";
  
export type UserFormProps = {
    editFormData:  submitUserFormDataProps | null;
    selectProfileDefaultValue: SelectProfileOptions[];
}
