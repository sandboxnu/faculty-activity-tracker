import { getUserByEmail } from '@/services/user';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        console.log(session.user.email);
        const user = await getUserByEmail(session.user.email);
        console.log(user);
        session.user.id = user.id || 1;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
