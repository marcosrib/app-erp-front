import { ReactNode } from 'react'

type Props = {
    icon: ReactNode
}

export function NavIcon({icon}:Props) {
    return (
        <span className="text-left">
            {icon}
        </span>
    )
}