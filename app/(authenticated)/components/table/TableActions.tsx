import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function TableActions({ children}: Props) {
    return (
        <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
            {children}
        </td>
    )
}