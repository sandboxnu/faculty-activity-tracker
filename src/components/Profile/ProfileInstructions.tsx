import SideBarBubble from '@/shared/components/SideBarBubble';
import React from 'react';

const ProfileInstructions: React.FC = () => {
  return (
    <>
      <SideBarBubble
        title="Activity Distribution"
        cookieKey="profile-activity-distribution"
      >
        <div className="my-2 space-y-1">
          <p>
            The activity distribution section contains your status as a
            professor, which relates to the expected amount of activities that
            the Merit Committee will expect you to complete over the course of a
            year (not academic year).
          </p>
          <p>
            Please select the appropriate status from the drop-down menu. The
            activity percentages between the three categories should total to
            100%.
          </p>
        </div>
      </SideBarBubble>
      <SideBarBubble
        title="Contact Information"
        cookieKey="profile-contact-information"
      >
        <p>
          For the contact information in your profile, please enter your school
          phone number and office location, as well as your @northeastern.edu
          email.
        </p>
      </SideBarBubble>
    </>
  );
};

export default ProfileInstructions;
