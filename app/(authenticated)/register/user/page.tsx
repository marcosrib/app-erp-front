'use client'
import { FormSearch } from "../../components/formSearch";
import { Input } from "@/app/components/input";
import { TableCustom } from "../../components/table";


export default function Users() {
    return (
      <>
      <FormSearch.Root>
        <FormSearch.InputContainer>
            <Input.Root>
              <Input.Label label="E-mail"/>
              <Input.Input />
            </Input.Root>
        </FormSearch.InputContainer>
        <FormSearch.Buttons>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Botão 1</button>
          <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Botão 2</button>
        </FormSearch.Buttons>
      </FormSearch.Root>
      <TableCustom.Root>
        <TableCustom.Body url="/api/user/">
        <TableCustom.Header>
          <TableCustom.HeaderContent title= 'Id'/>
          <TableCustom.HeaderContent title= 'Nome'/>
          <TableCustom.HeaderContent title= 'Email'/>
          <TableCustom.HeaderContent title= 'Perfil'/>
          <TableCustom.HeaderContent title= 'actions'/>
        </TableCustom.Header>
        <TableCustom.Column field="id">
        {(field) => {

          return <p className="text-black">{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="name">
        {(field) => {
          
          return <p className="text-black">{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="email">
        {(field) => {
          
          return <p className="text-black">{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="combinedData">
        {(field) => {
          return <p className="text-black">{JSON.parse(field).profiles[0]?.name}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="actions">
        {() => {
        return (<TableCustom.Actions>
          <button type="button" data-modal-toggle="product-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                   Edit item
                  </button>
                   <button type="button" data-modal-toggle="product-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                   Edit item
                  </button>
          </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
      
        </TableCustom.Body>
      </TableCustom.Root>
      </>
    );
  }
  