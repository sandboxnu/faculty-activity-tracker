import { ActivityDto } from "@/models/activity.model";
import React, { useState } from "react";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";

interface ActivityRowProps {
    activities: ActivityDto[];
    leftPadding?:boolean;
}

const cardsPerPage = 3;
const numShift = 3;

const ActivityRow: React.FC<ActivityRowProps> = ({ activities, leftPadding }) => {
    const numPages = Math.max(Math.ceil(activities.length/cardsPerPage), 1);
    const [ startCardIdx, setCardIdx ] = useState(0);
    const currPage = Math.floor(startCardIdx/3); 
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-end pr-12'> 
                <p className='bg-red text-white px-2.5 rounded-xl'>Page {currPage+1} of {numPages}</p>
            </div>
            <div className={`flex items-center ${leftPadding? "pl-8":" "} py-4 w-full relative overflow-x-hidden`}>
                {
                    activities.map((activity) => (
                        <div key={activity.id} className='w-1/3 flex-shrink-0 pr-12' style={{transform:`translate(-${startCardIdx*100}%)`}}>
                            <div className='rounded-lg bg-medium-grey shadow-sm hover:shadow-lg px-6 py-4 card h-39 cursor-pointer'>
                                <div className='flex flex-col'>
                                    <p className='text-sm text-g'>{moment(Number(activity.dateModified)).format("MMM D, YYYY")}</p>
                                    <p className='text-lg font-semibold my-3 truncate'>{activity.name}</p>
                                    <p className='text-g text-ellipsis-2 leading-5'>{activity.description}</p>
                                    <div className='hover-bar bg-red'/> 
                                </div>
                            </div>
                
                        </div>
                    ))
                }
                {
                    startCardIdx+cardsPerPage < activities.length &&
                    <div className='cursor-pointer absolute right-0 top-1/2 -translate-y-1/2' onClick={() => setCardIdx(prev => prev+numShift) }> 
                        <Image
                        src={'/media/rightArrow.svg'}
                        
                        alt="Icon"
                        width={16}
                        height={16}
                        className=""
                        />
                    </div>
                }
                {
                    startCardIdx > 0 &&
                    <div className='cursor-pointer absolute left-0 top-1/2 -translate-y-1/2' onClick={() => setCardIdx(prev => prev-numShift) }> 
                        <Image
                        src={'/media/rightArrow.svg'}
                        
                        alt="Icon"
                        width={16}
                        height={16}
                        className="rotate-180"
                        />
                    </div>

                }
            </div>
        </div>
        )
            
}

export default ActivityRow;
