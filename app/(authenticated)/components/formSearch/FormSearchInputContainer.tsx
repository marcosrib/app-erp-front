import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export function FormSearchInputContainer({children}: Props) {
    return (
        <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/3 px-2">
          <div className="relative mt-1">
            {children}
          </div>
        </div>
      </div>
    )
}