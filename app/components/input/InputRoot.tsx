import { ReactNode } from "react"

interface Props {
  children: ReactNode 
}

export function InputRoot({children}: Props) {
    return (
      <div className="mb-4">
        {children}
      </div>
    )
}