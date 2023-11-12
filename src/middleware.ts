export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/submissions',
    '/submissions/(.*)',
    '/narratives/(.*)',
    '/merit/(.*)',
    '/profile',
    '/account-setup',
  ],
};
