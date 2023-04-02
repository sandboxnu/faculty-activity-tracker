import React from 'react';

const Home: React.FC = () => {

  return (
    <div className='flex flex-col w-full px-8'>
      {/* Not really used now since "/" is redirected to "/dashboard" (see next.config.js) */}
      <h2>Index file</h2>
    </div>
  );
};

export default Home;
