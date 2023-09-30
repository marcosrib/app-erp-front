import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function ModaForm ({ children }: Props) {
 return (
    <div className="p-6 space-y-6">
     <form action="#">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {children}
        </div>
     </form>
    </div>
 )
}