import Head from 'next/head';

interface GraphPageProps {}

interface GraphPageProps {}

const GraphPage: React.FC<GraphPageProps> = () => {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Graph Page</title>
      </Head>
      <h1>Graph Page</h1>
      <p className="text-lg text-red-500 my-4">This is the graph page</p>
    </div>
  );
};

export default GraphPage;
