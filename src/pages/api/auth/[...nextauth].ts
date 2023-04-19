import { getUserForQuery } from '@/services/user';
import { isAdminUser } from '@/shared/utils/user.util';
import { Role } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, account }) {
      //console.log(token)
      //console.log(account)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      if (session.user && session.user.email) {
        const user = await getUserForQuery({ email: session.user.email });
        if (user !== 'not found' && user.length > 0) {
          session.user.id = user[0].id;
          session.user.admin = isAdminUser(user[0]);
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
