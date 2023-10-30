import Head from 'next/head';

interface GraphPageProps {}

interface GraphPageProps {}

const GraphPage: React.FC<GraphPageProps> = () => {
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
