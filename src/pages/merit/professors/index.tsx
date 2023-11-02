import Head from 'next/head';

interface ProfessorSearchPageProps {}

const ProfessorSearchPage: React.FC<ProfessorSearchPageProps> = ({}) => {
  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Professor Search Page</title>
      </Head>
      <h1>Professor Search Page</h1>
      <p className="my-4 text-lg text-red-500">
        This is the professor search page{' '}
      </p>
    </div>
  );
};

export default ProfessorSearchPage;
