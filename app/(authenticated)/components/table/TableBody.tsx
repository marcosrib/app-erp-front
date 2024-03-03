import React, { ReactNode } from 'react';
import Pagination from './Pagination';
import { fetchApi } from '@/app/services/fetchApi';
import { getHeaders } from '../../actions/headers';

type Props = {
  url: string;
  children: ReactNode;
  params?: any;
  isSize?: boolean;
};

export async function TableBody({
  children,
  url,
  params,
  isSize = true,
}: Props) {
  const initialParams = {
    page: 1,
    size: 10,
    ...params,
  };

  const paramsUrl = new URLSearchParams(initialParams).toString();
  const urlComplete = isSize ? `${url}?${paramsUrl}` : url;

  const headers = await getHeaders();
  let data = null;
  let totalPages = 0;
  try {
    data = await fetchApi<any>(urlComplete, {
      headers,
    });
  } catch (error) {
    console.error(error);
  }

  if (data === null) {
    return <>Não há dados</>;
  }

  if (isSize) {
    totalPages = data.totalPages;
    data = data.data;
  } else {
    data = data;
  }

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
                  {data.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                      {React.Children.map(children, (child, columnIndex) => {
                        if (React.isValidElement(child)) {
                          if (columnIndex === 0) return;

                          if (child.props.field === 'actions') {
                            return child.props.children(JSON.stringify(row));
                          }
                          return (
                            <td
                              key={columnIndex}
                              className="p-4 text-gray-600  text-sm font-normal  whitespace-nowrap"
                            >
                              {child.props.field === 'combinedData'
                                ? child.props.children(JSON.stringify(row))
                                : child.props.children(row[child.props.field])}
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
      {isSize && (
        <div
          className="
          flex justify-center items-center 
          p-4 my-4 mx-4
          bg-white rounded-2xl 
          text-xs
          shadow-xl shadow-gray-200 
          sm:flex sm:justify-between"
        >
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
