import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function TableRoot({children}: Props) {
    return (
       <>{children}</>     
    )

}