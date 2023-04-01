import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setResearchPercent, setServicePercent, setTeachingPercent, reset, selectTeachingPercent, selectResearchPercent, selectServicePercent } from "@/store/profile.store";
import PercentageInfo from "./PercentageInfo";
import { UpdateProfessorInfoDto } from "@/models/professorInfo.model";
import { updateProfessorInfoForUser } from "@/client/professorInfo.client";
import { ResponseStatus } from "@/client/activities.client";
import { useRouter } from "next/router";

export interface ProfileInformation {
    firstName: string,
    lastName: string,
    email: string,
    position: string,
    teachingPercent: number
    researchPercent: number,
    servicePercent: number
}

type ProfileInfoProps = ProfileInformation & { };

const Avatar: React.FC<{initials: string}> = ({ initials }) => (
    <div className="w-1/4">
        <div className="bg-light-grey bg-opacity-50 w-full h-0 pb-[100%] rounded-full relative border border-gray-700">
            <div className="text-red text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{initials}</div>
        </div>
    </div>
);

const ProfileInfo: React.FC<ProfileInfoProps> = ({ firstName, lastName, email, position, teachingPercent, researchPercent, servicePercent }) => {
    const defaultIcon = true;
    const [ editing, setEditing ] = useState(false);
    const [ error, setError ] = useState<string | null>(null)
    const teachingInput = useSelector(selectTeachingPercent);
    const researchInput = useSelector(selectResearchPercent);
    const serviceInput = useSelector(selectServicePercent);
    const dispatch = useDispatch();
		const router = useRouter();
 
    const startEditing = () => {
        // configure store with current values
        dispatch(setTeachingPercent(teachingPercent));
        dispatch(setResearchPercent(researchPercent));
        dispatch(setServicePercent(servicePercent));
        setEditing(true);
    };

    const cancel = () => {
        dispatch(reset());
        setEditing(false);
    };
    
    const submit = () => {
        if (teachingInput + researchInput + serviceInput !== 1) return;
        const updateInfo: UpdateProfessorInfoDto = {teachingPercent: teachingInput, researchPercent: researchInput, servicePercent: serviceInput};
        updateProfessorInfoForUser(updateInfo).then((res) => {
					if (res === ResponseStatus.NotFound) setError("Professor info could not be found.");
					else if (res === ResponseStatus.Unauthorized) setError("Unauthorized.");
					else if (res === ResponseStatus.UnknownError) setError("Unknown error.");
					else {
						setEditing(false);
						router.reload();
					}
        });
    };

    if (error) return <p className='text-red w-full text-center mt-20'>Error: {error || "unknown error."}</p>

    return (
        <div className="w-full pl-10 flex flex-col relative">
            <div className="flex items-center w-full mb-10 pt-4" key="image+info">
                {
                    defaultIcon ? 
                    <Image src='/media/profileDefaultIcon.svg' alt="icon" width="175" height="175" /> :
                    <Avatar initials={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`} />
                }
                <div className="ml-9">
                    <h2>{firstName}&nbsp;{lastName}</h2>
                    <p>{position}</p>
                </div>
            </div>
            <div key="activity-info">
                <div className="flex items-center w-full mb-6 pr-5">
                    <p className="text-base font-bold mr-2">Activity Distribution</p>
                    <div className="flex-grow h-[1.5px] bg-light-grey" />
                </div>
                <PercentageInfo editing={editing} teaching={teachingPercent} research={researchPercent} service={servicePercent} />
            </div>
            <div key="contact-info">
                <div className="flex items-center w-full mt-10 pr-5">
                    <p className="text-base font-bold mr-2">Contact Information</p>
                    <div className="flex-grow h-[1.5px] bg-light-grey" />
                </div>
                <div className="mt-5 mb-6">
                    <div className="flex flex-col">
                        <p className="mb-2">Email</p>
                        <p className="px-4 py-1.5 border-[0.5px] border-g rounded-xl w-max min-w-[250px]">{email}</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 space-x-4">
                { 
                    editing &&
                    <button onClick={cancel} className='px-3 py-2 bg-medium-grey border border-g text-g rounded-xl'>Cancel</button>
                }
                <button className='px-3 py-2 bg-red text-white rounded-xl' onClick={editing ? submit : startEditing} disabled={editing && (teachingInput + researchInput + serviceInput !== 1)}>{editing ? 'Save' : 'Edit'} Profile</button>
            </div>
        </div>
    );
}

export default ProfileInfo;
