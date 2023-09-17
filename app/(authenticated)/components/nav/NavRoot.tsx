import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export function NavRoot({children}: Props) {
    return (
        <nav className="mt-10">
          {children}
        </nav>
    )
}