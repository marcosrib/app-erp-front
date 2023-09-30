'use client'
import api from '@/app/services/api'
import React, { ReactNode, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
type Props = {
    url: string;
    children: ReactNode 
}

export function TableBody({ children , url}: Props) {
 const [ data , setData] = useState([]);
 const [currentPage, setCurrentPage] = useState(0);
 const [totalPages, setTotalPages] = useState(0);
 
  const header = React.Children.toArray(children)[0];
  
  useEffect(() => {
    get();
  },[currentPage])
  async function get() {
    try {
     const response = await api.get(url, {
      params: {
        page: currentPage + 1, 
        size: 5,
      },
    });

     setData(response.data.data)
     setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }


  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }


    return (
      <>
      <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="overflow-x-auto rounded-2xl">
         <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        {header}
        <tbody className="bg-white divide-y divide-gray-200">
         {data.map((row, rowIndex) => (
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
        <div className="flex justify-center items-center p-4 my-4 mx-4 bg-white rounded-2xl shadow-xl shadow-gray-200 sm:flex sm:justify-between">
       <ReactPaginate
            pageCount={totalPages}
            previousLabel={'Anterior'}
            nextLabel={'Próximo'}
            pageRangeDisplayed={7}
            marginPagesDisplayed={0}
            breakLabel={null} 
            breakClassName={'hidden'}
            pageLinkClassName={'px-2 rounded-md'}
            previousLinkClassName={'bg-gray-200 px-2 py-2 mr-2 rounded-md'}
            nextLinkClassName={'bg-gray-200 px-2 py-2 ml-2 rounded-md'}
            activeClassName="bg-slate-500  text-white"
            pageClassName="px-2 py-1.5 rounded-lg"
            containerClassName={'flex justify-center items-center'}
            onPageChange={({ selected }) => setCurrentPage(selected)}
           />
           </div>
    </>   
    )
}