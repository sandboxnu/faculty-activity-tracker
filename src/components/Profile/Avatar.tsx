import React from "react";

const Avatar: React.FC<{ initials: string }> = ({ initials }) => (
    <div className="w-1/4">
        <div className="bg-light-grey bg-opacity-50 w-full h-0 pb-[100%] rounded-full relative border border-gray-700">
        <div className="text-red text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {initials}
        </div>
        </div>
    </div>
);

export default Avatar;
