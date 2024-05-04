export const formatCurrency = (value: string) => {  
    if(!value) return
    return value.replace('.', '').replace(',', '.')
} 

export const formatCurrencyValue = (value: string) => {  
    if (!value) {
        return '';
    }
    
    return parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}