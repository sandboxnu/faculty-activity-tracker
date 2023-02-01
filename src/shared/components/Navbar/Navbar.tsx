import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { resetForm } from '../../../store/form.store';
import styles from './Navbar.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div className={styles.navbarContainer}>
            <Image src="/media/neuLogo.svg" alt="CAMD Logo" width={200} height={50} />
            {/*<img src={neuLogo} alt="CAMD Logo"/>*/}
            <Link className={`${styles.link} ${router.pathname == "/dashboard" ? styles.active: styles.notActive}`} href='/dashboard'>Dashboard</Link>
            <Link className={`${styles.link} ${router.pathname == "/submissions/new" ? styles.active: styles.notActive}`} href='/submissions/new' onClick={() => dispatch(resetForm())}>Submit a New Activity</Link>
            <Link className={`${styles.link} ${router.pathname == "/submissions" ? styles.active: styles.notActive}`} href='/submissions'>Submissions</Link>
            <Link className={`${styles.link} ${router.pathname == "/profile" ? styles.active: styles.notActive}`} href='/profile'>My Profile</Link>  
        </div>
    )
};


export default Navbar;