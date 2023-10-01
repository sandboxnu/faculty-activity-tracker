
import Head from 'next/head';

interface ProfessorScoringPageProps {

  }

const ProfessorScoringPage: React.FC<ProfessorScoringPageProps> = ({

  }) => {    return (
        <div className="flex flex-col w-full">
          <Head>
            <title>Professor Scoring Page</title>
          </Head>
          <h1>Professor Scoring Page</h1>
          <p className="text-lg text-red-500 my-4">Professor Scoring Page </p>
        </div>
      );
  }

  export default ProfessorScoringPage;