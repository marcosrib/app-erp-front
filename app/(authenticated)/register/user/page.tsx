'use client'
import { FormSearch } from "../../components/formSearch";
import { Input } from "@/app/components/input";
import { TableCustom } from "../../components/table";


export default function Users() {
  const data = [
    {
      id: 1,
      nome: "Objeto 1",
      valor: 100,
      preco: {
        id: 100
      }
    },
    {
      id: 2,
      nome: "Objeto 2",
      valor: 200,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    {
      id: 3,
      nome: "Objeto 3",
      valor: 300,
    },
    
    // Adicione mais objetos conforme necessário
  ];
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
        <TableCustom.Header>
          <TableCustom.HeaderContent title= 'Nome'/>
          <TableCustom.HeaderContent title= 'id'/>
          <TableCustom.HeaderContent title= 'actions'/>
        </TableCustom.Header>
        <TableCustom.Body data={data} keys={['nome', 'id']} >
        <TableCustom.Column field="combinedData">
        {(row) => {
          
          return <p className="text-black">{JSON.parse(row).nome}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="id">
        {(field) => {
          
          return <p className="text-black">{field}</p>;
        }}
        </TableCustom.Column>
         { /**<TableCustom.Actions>
          <button type="button" data-modal-toggle="product-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                    <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                    Edit item
                  </button>
                  <button type="button" data-modal-toggle="delete-product-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform">
                    <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    Delete item
                  </button>
          </TableCustom.Actions>**/}
        </TableCustom.Body>
      </TableCustom.Root>
      </>
    );
  }
  