type props =  {
    helperText?: string
}

export function InputLabelError({ helperText }: props) {    
    return (
        <> 
        { helperText && 
           <span className="block text-red-500 text-sm font-medium mb-2 mt-2">
             {helperText}
           </span>
        }
        </>
    )

}