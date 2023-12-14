import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export function FormSearchInputContainer({children}: Props) {
    return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {children}
          </div>
    )
}
