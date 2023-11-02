import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { resetForm } from '../../store/form.store';
import { useSession } from 'next-auth/react';

const SideNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category } = router.query;
  const { data: session } = useSession();
  const isAdmin = session?.user.admin;
  const isMerit = session?.user.merit;

  const navClass = 'text-body-bold text-black pb-2 nav-underline relative';

  return (
    <div className="flex min-w-[207px] flex-col items-start space-y-4 bg-white px-6 py-6 font-bold">
      <Link
        href={isMerit ? '/merit/dashboard' : '/dashboard'}
        className={`${navClass} ${
          router.pathname == `${isMerit ? '/merit/dashboard' : '/dashboard'}`
            ? 'nav-underline-red'
            : 'hover:nav-underline-red'
        }`}
      >
        Dashboard
      </Link>
      {!isMerit && (
        <Link
          href="/submissions/new"
          className={`${navClass} ${
            router.pathname == '/submissions/new'
              ? 'nav-underline-red'
              : 'hover:nav-underline-red'
          }`}
          onClick={() => dispatch(resetForm())}
        >
          Submit a New Activity
        </Link>
      )}
      {!isMerit && (
        <>
          <p className={`${navClass} cursor-default hover:border-white`}>
            Submissions
          </p>

          <div className="ml-4 border-l pl-2">
            <div className="flex flex-col items-start space-y-5">
              <Link
                href="/submissions/teaching"
                className={`nav-underline relative pb-2 text-body ${
                  category == 'teaching'
                    ? 'nav-underline-red'
                    : 'hover:nav-underline-red'
                }`}
              >
                Teaching
              </Link>
              <Link
                href="/submissions/research"
                className={`nav-underline relative pb-2 text-body ${
                  category == 'research'
                    ? 'nav-underline-red'
                    : 'hover:nav-underline-red'
                }`}
              >
                Research
              </Link>
              <Link
                href="/submissions/service"
                className={`nav-underline relative pb-2 text-body ${
                  category == 'service'
                    ? 'nav-underline-red'
                    : 'hover:nav-underline-red'
                }`}
              >
                Service
              </Link>
            </div>
          </div>
        </>
      )}
      {!isMerit && (
        <Link
          href="/profile"
          className={`${navClass} ${
            router.pathname == '/profile'
              ? 'nav-underline-red'
              : 'hover:nav-underline-red'
          }`}
        >
          My Profile
        </Link>
      )}
      {isMerit && (
        <Link
          href="/merit/professors"
          className={`${navClass} ${
            router.pathname == '/merit/professors'
              ? 'nav-underline-red'
              : 'hover:nav-underline-red'
          }`}
        >
          Professors
        </Link>
      )}
      {isMerit && (
        <Link
          href="/merit/graphs"
          className={`${navClass} ${
            router.pathname == '/merit/graphs'
              ? 'nav-underline-red'
              : 'hover:nav-underline-red'
          }`}
        >
          Graphs
        </Link>
      )}
      {isAdmin && (
        <Link
          href="/admin"
          className={`${navClass} ${
            router.pathname == '/admin'
              ? 'nav-underline-red'
              : 'hover:nav-underline-red'
          }`}
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default SideNavbar;
