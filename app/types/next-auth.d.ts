import NextAuth from "next-auth";
declare module 'next-auth' {
    interface Session {
        accessToken: string,
        error: string,
        user: {
            name: string,
            accessToken: string
        }
    }
    interface User {
            name: string,
            accessToken: string,
            refreshToken: string,
            accessTokenExpiry: number,
            authorities: []
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string,
        refreshToken: string,
        error: string,
    }
  }


