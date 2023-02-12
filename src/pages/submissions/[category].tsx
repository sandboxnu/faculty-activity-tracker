import { useRouter } from "next/router";
import React from "react";

const SubmissionsPage: React.FC = () => {
    const router = useRouter();
    const { category } = router.query;

    return (
        <div>
            { category }
        </div>
    );
}

export default SubmissionsPage;
