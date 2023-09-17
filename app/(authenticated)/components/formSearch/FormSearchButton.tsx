import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function FormSearchButton({children}: Props) {
    return (
        <div className="mt-4">
        <div className="flex justify-end">
            {children}
        </div>
      </div>
    )
}