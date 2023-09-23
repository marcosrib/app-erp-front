import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function TableRoot({children}: Props) {
    return (
        <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
          <div className="overflow-x-auto rounded-2xl">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
               <table className="min-w-full divide-y divide-gray-200 table-fixed">
                {children}
               </table>  
            </div>
          </div>
         </div>
        </div> 
    )

}