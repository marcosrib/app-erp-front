import { ModalRef } from "../../modal/ModalRoot";

export type ProfileProps = {
  id: number,
  name: string,
}

export type SelectProfileOptions = {
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
  
export type UserFormProps = {
    openModalCreateUser: () => void;
    modalRef: React.RefObject<ModalRef>; 
    editFormData:  submitUserFormDataProps | null;
    selectProfileOptions: SelectProfileOptions[];
    selectProfileDefaultValue: SelectProfileOptions[];
}
