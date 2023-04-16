export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/submissions',
    '/submissions/(.*)',
    '/narratives/(.*)',
    '/profile',
    '/account-setup',
  ],
};
