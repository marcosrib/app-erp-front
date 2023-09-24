import React, { ReactNode } from "react"

type Props = {
    data: Array<any>,
    keys: Array<string>,
    children: ReactNode 
}

export function TableBody({ children, data, keys }: Props) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
    return (
        <tbody className="bg-white divide-y divide-gray-200">
         {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-gray-100">
          {React.Children.map(children, (child, columnIndex) => {
            if (React.isValidElement(child)) {
              return (
                <td
                  key={columnIndex}
                  className="p-4 text-base font-medium  whitespace-nowrap lg:p-5"
                >
                  {child.props.field === 'combinedData' ? child.props.children(JSON.stringify(row)) : child.props.children(row[child.props.field])}
                </td>
              );
            }
            return null; 
          })}
        </tr>
      ))}

        {/**data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {keys.map((header, index) => (
              <td
                key={header}
                className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5"
              >
               {row[header]}
              </td>
            ))}
           {children}
          </tr>
            ))*/}
        </tbody>
       
    )
}