import { FiEdit } from "react-icons/fi";
import { TableCustom } from "../../components/table";
import { TableButtonLink } from "../../components/table/TableButtonLink";
import { ParamsProps } from "../user/types";

export default async function Permission({ searchParams }: ParamsProps) {
    return (
        <TableCustom.Root>
        <TableCustom.Body
         isSize={false}
         url="api/profile/" 
         params={searchParams}
        >
        <TableCustom.Header>
          <TableCustom.HeaderContent title= 'Id'/>
          <TableCustom.HeaderContent title= 'Nome'/>
          <TableCustom.HeaderContent title= 'Ações'/>
        </TableCustom.Header>
        <TableCustom.Column field="id">
        {(field) => {

          return <p>{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="name">
        {(field) => {
          
          return <p>{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="actions">
        {(row) => {
          let permission = JSON.parse(row);
        return (
        <TableCustom.Actions>
          <TableButtonLink  color="edit" href={`/register/permission/${permission.id}`} >
          <TableCustom.Icon icon={ <FiEdit color={'white'}  size={16}/> }/>
          </TableButtonLink>
        </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    )
    }