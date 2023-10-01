import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { resetForm } from '../../store/form.store';
import { useSession } from 'next-auth/react';

const SideNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const { category } = router.query;
  const { data: session } = useSession();
  const isAdmin = session?.user.admin;
  const isMerit = session?.user.merit;

  useEffect(() => {
    // don't think this is the best logic
    setSubmissionsOpen(
      category !== undefined ||
        (pathname.includes('/submissions') && !pathname.includes('new')),
    );
  }, [pathname, category]);

  const [submissionsOpen, setSubmissionsOpen] = useState(
    router.pathname.includes('/submissions') &&
      !router.pathname.includes('new'),
  );

  const navClass = 'text-base text-black font-bold pb-2 nav-underline relative';

  return (
    <div className="flex flex-col items-start min-w-[207px] bg-white font-bold px-6 py-6 space-y-4">
      <Link
        href="/merit/dashboard"
        className={`${navClass} ${
          router.pathname == '/merit/dashboard'
            ? 'nav-underline-red'
            : 'hover:nav-underline-red'
        }`}
      >
        Dashboard
      </Link>
      {!isMerit && (<Link
        href="dashboard"
        className={`${navClass} ${
          router.pathname == 'dashboard'
            ? 'nav-underline-red'
            : 'hover:nav-underline-red'
        }`}
      >
        Dashboard
      </Link>
      )}
      {!isMerit && (<Link
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
      {!isMerit && (<p
        className={`${navClass} cursor-pointer hover:border-white`}
        onClick={() =>
          category === undefined ? setSubmissionsOpen((b) => !b) : {}
        }
      >
        Submissions
      </p>
      )}
      {submissionsOpen && (
        <div className="flex flex-col items-start space-y-5 pl-4">
          <Link
            href="/submissions/teaching"
            className={`${navClass} ${
              category == 'teaching'
                ? 'nav-underline-red'
                : 'hover:nav-underline-red'
            }`}
          >
            Teaching
          </Link>
          <Link
            href="/submissions/research"
            className={`${navClass} ${
              category == 'research'
                ? 'nav-underline-red'
                : 'hover:nav-underline-red'
            }`}
          >
            Research
          </Link>
          <Link
            href="/submissions/service"
            className={`${navClass} ${
              category == 'service'
                ? 'nav-underline-red'
                : 'hover:nav-underline-red'
            }`}
          >
            Service
          </Link>
        </div>
      )}
     {!isMerit && (<Link
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
     {isMerit && (<Link
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
     {isMerit && (<Link
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
