import { ComponentProps, ReactNode } from "react"

type Props = ComponentProps<'button'> & {
    label: string,
    children: ReactNode
}
export function TableButton({label, children, ...props}: Props) {
    return (
        <button 
         type="button" 
         className="inline-flex items-center py-2 px-3 text-sm 
          font-medium text-center 
          text-white bg-green-800 
          rounded-lg hover:bg-gray-300
          hover:text-gray-900 
          hover:scale-[1.02] transition-all"
          {...props}
          >
         {children}{label}
       </button>
    )
}