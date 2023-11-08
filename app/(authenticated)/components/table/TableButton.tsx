import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const button = tv({
    base: 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all',
    variants: {
        color: {
          edit: 'bg-cyan-700 hover:bg-cyan-800',
          active: 'bg-green-500 hover:bg-green-600',
          inactive: 'bg-red-500 hover:bg-red-600'
        }
        
    }
})

type Props = ComponentProps<'button'> 
& VariantProps<typeof button> & {
    label?: string,
    children: ReactNode
}

export function TableButton({label,color, children, ...props}: Props) {
    return (
        <button 
         type="button" 
         className={button({ color })}
          {...props}
          >
         {children}{label}
       </button>
    )
}