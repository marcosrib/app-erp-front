import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/app/services/user/userService';
import Pagination from './Pagination';

type Props = {
  url: string;
  children: ReactNode;
  params?: any;
}

export async function TableBody({ children, url, params}: Props) {

  const session = await getServerSession(nextAuthOptions);

  const initialParams = {
    page: 1,
    size: 5,
    ...params
  }


  const paramsUrl = new URLSearchParams(initialParams).toString(); 
  const data = await getUsers(`${url}?${paramsUrl}`, session?.accessToken);

  
  const header = React.Children.toArray(children)[0];
 
  return (
      <>
      <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="overflow-x-auto rounded-2xl">
         <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        {header}
        <tbody className="bg-white divide-y divide-gray-200">
         {data.data.map((row: any, rowIndex: number) => (
        <tr key={rowIndex} className="hover:bg-gray-100">
          {React.Children.map(children, (child, columnIndex) => {
            if (React.isValidElement(child)) {

              if (columnIndex === 0) return;

              if(child.props.field === 'actions') {
                return(
                  child.props.children(JSON.stringify(row))
                )
              }
              return (
                <td
                  key={columnIndex}
                  className="p-4 text-gray-600 text-base font-medium  whitespace-nowrap"
                >  
                {
                  child.props.field === 'combinedData' ? child.props.children(JSON.stringify(row)) : child.props.children(row[child.props.field])
                }
                </td>
              );
            }
            return null; 
          })}
        </tr>
        ))}
      </tbody>
      </table>
      </div>
          </div>
         </div>
        </div>  
        <div className="
          flex justify-center items-center 
          p-4 my-4 mx-4
          bg-white rounded-2xl 
          shadow-xl shadow-gray-200 
          sm:flex sm:justify-between">
         <Pagination totalPages={data.totalPages}   />
        </div>
    </>   
    )
}