import React from 'react';

const ProfileInstructions: React.FC = () => {
  return (
    <>
      <div className="flex flex-col px-5 py-4 bg-medium-grey w-full rounded-lg space-y-4">
        <h3>Activity Distribution</h3>
        <p>
          The activity distribution section contains your status as a professor,
          which relates to the expected amount of activities that the Merit
          Committee will expect you to complete over the course of a year (not
          academic year).
        </p>
        <p>
          Please select the appropriate status from the drop-down menu. The
          activity percentages between the three categories should total to
          100%.
        </p>
      </div>
      <div className="flex flex-col px-5 py-4 bg-medium-grey w-full rounded-lg space-y-4">
        <h3>Contact Information</h3>
        <p>
          For the contact information in your profile, please enter your school
          phone number and office location, as well as your @northeastern.edu
          email.
        </p>
      </div>
    </>
  );
};

export default ProfileInstructions;
