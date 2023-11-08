import { ReactNode } from 'react'

type Props = {
    icon: ReactNode
}

export function TableButtonIcon({icon}:Props) {
    return (
        <span className="w-4">
            {icon}
        </span>
    )
}