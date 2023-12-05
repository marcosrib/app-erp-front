import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getHeaders() {
    const session = await getServerSession(nextAuthOptions);
    const token =session?.accessToken
    return {
        'Authorization': `Bearer ${token}`
    }
  }
  