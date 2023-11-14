import ErrorMessage from '@/shared/components/ErrorMessage';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

interface GraphPageProps {}

interface GraphPageProps {}

const GraphPage: React.FC<GraphPageProps> = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  if (!session?.user.merit) {
    return <ErrorMessage message="You are not authorized to view this page." />;
  }

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Graph Page</title>
      </Head>
      <h1>Graph Page</h1>
      <p className="my-4 text-lg text-red-500">This is the graph page</p>
    </div>
  );
};

export default GraphPage;
