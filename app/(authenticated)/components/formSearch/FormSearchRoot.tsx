
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function FormSearchRoot({children}: Props) {
    
    return (
      <div className="block items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Usuario</h1>
          </div>
          {children}
        </div>
      </div>
    )
}

