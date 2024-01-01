export function formaterUserName(userName: string) {
    const parts = userName.split(" ");
    if (parts.length >= 1) {
        const firstName = parts[0];
        const secondPart = parts[1];
        
        if (secondPart === undefined) {
            return `${firstName}`;
        }

        const firstLetterSecondName = secondPart.charAt(0);
        
        return  `${firstName} ${firstLetterSecondName}`;
    } 
}