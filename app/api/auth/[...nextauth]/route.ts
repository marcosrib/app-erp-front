import axios, { Axios } from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(tokenObject: any) {
    try {
        const tokenResponse = await axios.post('http://localhost:8082/auth/refresh/', {
            refreshToken: tokenObject.refreshToken
        });
        
        return {
            ...tokenObject,
            accessToken: tokenResponse.data.accessToken,
            refreshToken: tokenObject.refreshToken
        }
    } catch (error) {       
        return {
            error: 'token-invalid'
        };
    }
}

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
               email: { label: 'email', type: 'text' },
               password: { label: 'password', type: 'password'},

            },
           async authorize(credentials, req){
                try {
                  
                    const user = await axios.post('http://localhost:8082/auth/login/', {
                        password: credentials?.password,
                        email: credentials?.email
                    });

                    if (user.data) {
                        const claimUser = JSON.parse(atob(user.data.accessToken .split('.')[1]));
                        console.log(claimUser);
                        
                        user.data.name =  claimUser.name;
                        user.data.accessTokenExpiry = claimUser.exp;
                        return user.data;
                    }

                    return null;
                } catch (e) {
                    throw new Error(e as any);
                }
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
      async jwt({token, user}) { 
     
        if (user) {
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
            token.accessTokenExpiry = user.accessTokenExpiry;
            token.name = user.name;
        }

        const tokenExpiration = token.accessTokenExpiry as number; // Tempo de expiração do token em segundos
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tempo atual em segundos

        const shouldRefreshTime = tokenExpiration - currentTimeInSeconds;
 
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }
       
        const updatedToken = await refreshAccessToken(token);

        return Promise.resolve(updatedToken);
        },
        async session({ session, token }) {
            
            if(token.error === 'token-invalid') {
                session = {} as any
               return Promise.resolve(session);
            }

            session.accessToken = token.accessToken;
            
        return Promise.resolve(session);
      }
    }

}

const handler = NextAuth(nextAuthOptions)
export { handler as GET, handler as POST, nextAuthOptions};
