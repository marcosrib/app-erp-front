import { MdToken } from "react-icons/md";
import { fetchApi } from "../fetchApi";

interface User {
    id: string,
    name: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiry: number
}

interface Token {
    accessToken: string,
}

export async function signIn(email?: string,password?: string) {
        
    const user = await fetchApi<User>('auth/login/', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return user;
}

export async function refreshToken(refreshToken: string) {
        const token = await fetchApi<Token>('auth/refresh/', {
            method: 'POST',
            body: JSON.stringify({
                refreshToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return token;
}