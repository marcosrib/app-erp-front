import { ReactNode } from "react"

interface props {
  children: ReactNode 
}

export function InputRoot({children}: props) {
    return (
      <div className="mb-4">
        {children}
      </div>
    )
}