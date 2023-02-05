import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { resetForm } from '../../store/form.store';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const navlinks: { path: string, name: string, onClick?: () => void }[] = [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/submissions/new", name: "Submit a New Activity", onClick: () => dispatch(resetForm()) },
        { path: "/submissions", name: "Submissions" },
        { path: "/profile", name: "My Profile" },
    ];

    return (
        <div className="flex justify-between items-baseline w-screen bg-black font-bold px-12 py-6">
            <Image src="/media/neuLogo.svg" alt="CAMD Logo" width={200} height={50} />
            {
                navlinks.map(({ path, name, onClick}) => (
                    <Link key={path} className={`text-white font-bold pb-2 border-b-2 border-transparent ${router.pathname == path ? 'border-ruby': 'hover:border-white'}`} href={path} onClick={() => onClick !== undefined ? onClick() : {}}>{name}</Link>
                ))
            }
        </div>
    )
};


export default Navbar;