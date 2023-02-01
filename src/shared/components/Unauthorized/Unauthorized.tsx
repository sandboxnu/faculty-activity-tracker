import React from "react"
import Link from "next/link";

const Unauthorized: React.FC = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>You must be logged in to view this page!</p>
            <Link href="/api/auth/signin">Login</Link>
        </div>
    );
}

export default Unauthorized;
