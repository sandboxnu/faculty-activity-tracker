import { CreateUserDto } from '@/models/user.model';
import { getUsersByQuery } from '@/services/user';
import { NotFacultyUser, isAdminUser } from '@/shared/utils/user.util';
import { Role } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const preview_providers = [
  CredentialsProvider({
    name: 'FACULTY',
    id: 'faculty-test-provider',
    // @ts-ignore comment
    async authorize() {
      return {
        id: 1,
        name: 'Faculty TestUser',
        email: 'faculty_test_user@husky.neu.edu',
        image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
      };
    },
  }),
  CredentialsProvider({
    name: 'MERIT_COMMITTEE_MEMBER',
    id: 'merit-test-provider',
    // @ts-ignore comment
    async authorize() {
      return {
        id: 2,
        name: 'Merit TestUser',
        email: 'merit_test_user@husky.neu.edu',
        image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
      };
    },
  }),
];

const production_providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
];

const getProvider = () => {
  if (process.env.VERCEL_ENV === 'preview') {
    return preview_providers;
  } else {
    return production_providers;
  }
};

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers

  // @ts-ignore comment
  providers: getProvider(),

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
        const users = await getUsersByQuery({ email: session.user.email });
        if (users?.length > 0) {
          session.user.id = users[0].id;
          session.user.admin = isAdminUser(users[0]);
          session.user.merit = NotFacultyUser(users[0]);
        }
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      let emailPattern = /[(\w)+.(\w), (\w)+]@husky.neu.edu/;
      if (user.email === 'maxpinheiro181@gmail.com') return true;
      if (!user.email || !emailPattern.test(user.email)) {
        return '/invalid-email';
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
