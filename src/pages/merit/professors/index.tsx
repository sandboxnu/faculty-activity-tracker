
import Head from 'next/head';

interface ProfessorSearchPageProps {

  }

const ProfessorSearchPage: React.FC<ProfessorSearchPageProps> = ({

  }) => {    return (
        <div className="flex flex-col w-full">
          <Head>
            <title>Professor Search Page</title>
          </Head>
          <h1>Professor Search Page</h1>
          <p className="text-lg text-red-500 my-4">This is the professor search page </p>
        </div>
      );
  }

  export default ProfessorSearchPage;