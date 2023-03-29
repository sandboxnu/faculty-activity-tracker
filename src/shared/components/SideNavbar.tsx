import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { resetForm } from '../../store/form.store';

const SideNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const { category } = router.query;

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

  const navClass = 'text-black font-bold pb-2 border-b-2 border-transparent';

  return (
    <div className="flex flex-col items-start min-w-max bg-white font-bold px-6 py-6 space-y-4">
        <Link href="/dashboard" className={`${navClass} ${router.pathname == "/dashboard" ? 'border-ruby' : 'hover:border-ruby'}`}>
          Dashboard
        </Link>
        <Link href="/submissions/new" className={`${navClass} ${router.pathname == "/submissions/new" ? 'border-ruby' : 'hover:border-ruby'}`}
            onClick={() => dispatch(resetForm())}>
          Submit a New Activity
        </Link>
        <p className={`${navClass} cursor-pointer hover:border-white`}
            onClick={() => category === undefined ? setSubmissionsOpen(b => !b) : {}}>
          Submissions
        </p>
        { 
            submissionsOpen &&
            <div className='flex flex-col items-start space-y-5 pl-4'>
                <Link href="/submissions/teaching" className={`${navClass} ${category == "teaching" ? 'border-ruby' : 'hover:border-ruby'}`}>
                    Teaching
                </Link>
                <Link href="/submissions/research" className={`${navClass} ${category == "research" ? 'border-ruby' : 'hover:border-ruby'}`}>
                    Research
                </Link>
                <Link href="/submissions/service" className={`${navClass} ${category == "service" ? 'border-ruby' : 'hover:border-ruby'}`}>
                    Service
                </Link>
            </div>
        }
      <Link href="/profile" className={`${navClass} ${ router.pathname == '/profile' ? 'border-ruby' : 'hover:border-ruby' }`}>
        My Profile
      </Link>
    </div>
  );
};

export default SideNavbar;
