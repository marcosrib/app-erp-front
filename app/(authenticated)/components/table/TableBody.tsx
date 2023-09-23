import React, { ReactNode } from "react"

type Props = {
    data: Array<any>,
    keys: Array<string>,
    children: ReactNode
}

export function TableBody({ children, data, keys }: Props) {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
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
        ))}
        </tbody>
       
    )
}