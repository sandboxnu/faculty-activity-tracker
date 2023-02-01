import Link from 'next/link';
import React from 'react';

const Profile: React.FC = () => {

    return (
        <div>
            <h1>Profile</h1>
            <Link href="/api/auth/signout">Sign Out</Link>
        </div>
    );
};

export default Profile;
