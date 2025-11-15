import React from 'react';

interface AccessEmailProps {
  email: string;
  courseName: string;
  accessLink: string;
}

const AccessEmail: React.FC<AccessEmailProps> = ({ email, courseName, accessLink }) => {
  return (
    <div>
      <h1>Your Key to the Fortress</h1>
      <p>Dear {email},</p>
      <p>
        Thank you for your acquisition. You have been granted access to the following course:
      </p>
      <h2>{courseName}</h2>
      <p>
        Use the link below to access your course. This link is unique to you. Do not share it.
      </p>
      <a href={accessLink}>Access Your Course</a>
      <p>
        The Architect
      </p>
    </div>
  );
};

export default AccessEmail;
