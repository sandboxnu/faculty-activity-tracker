// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await prisma.user.findMany();
  console.table(data);

  res.json(data);
}
