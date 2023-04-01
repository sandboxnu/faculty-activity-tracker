import NextAuth, { Account, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: Account.accessToken;
    user: {
      id: number | undefined;
    } & DefaultSession['user'];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
      accessToken?: Account.accessToken
  }
}
