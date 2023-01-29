import { ActivityDto } from '@/models/activity.dto';
import React, { useEffect } from 'react';
//import "./Submissions.scss";

const activities: ActivityDto[] = [
    {
        id: "1",
        name:"name",
        academicYearId:"1",
        isFavorite:false,
        userId:"1", 
        year:2023, 
        semester:"Fall", 
        description:"uddjnxdx", 
        category:"RESEARCH",
        significance:"MAJOR"
    },
    {
        id: "2",
        name:"name 2",
        academicYearId:"1",
        isFavorite:false,
        userId:"1", 
        year:2023, 
        semester:"Fall", 
        description:"uddjnxdx", 
        category:"TEACHING",
        significance:"MAJOR"
    }
];

//const seperateActivites = seperateActivitiesByCategory(activities);

const SubmissionsPage: React.FC = () => {
    useEffect(() => {
        /*getActivitiesForUser('1').then((activities) => {
            console.log(activities);
        })*/
    });
    return (
        <div className="submission-page-container">
            <h1>Submitted Activities</h1>
        </div>
    );
};

export default SubmissionsPage;
