import { fetchApi } from "../fetchApi";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from '../../api/auth/[...nextauth]/route';
import { ProfileProps } from "@/app/(authenticated)/register/user/types";

interface Profiles {
    id: string,
    name: string
}

interface User {
    id: string,
    name: string,
    email: string,
    status: string,
    profiles: Profiles[]
}

interface UserData {
    data: User[],
    totalPages: number,
    totalElements: number,
    nextPage: number,
    previousPage: number,
    currentPage: number
}


export async function getUsers(url: string, token?: string) {
    
    const users = await fetchApi<UserData>(url, {
        method: 'GET',
        headers: headers(token)
    })

    return users;
}

function  headers(token?: string) {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

