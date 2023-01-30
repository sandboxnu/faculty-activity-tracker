import React from "react";
import { useSession } from "next-auth/react"
import Link from "next/link";


const Home: React.FC = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <p>You must be logged in to view this page!</p>
                <Link href="/api/auth/signin">Login</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
