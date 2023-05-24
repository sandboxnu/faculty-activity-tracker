import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUser, deleteUser } from '@/services/user';
import { CreateUserDto, UpdateUserDto } from '@/models/user.model';
import { obtainRole } from '@/services/accessCode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      // PUT /users[id] => update user of specified id
      await handlePost(req, res);
      break;
    // not a GET or PUT request so shouldn't be using this route
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const code = JSON.parse(JSON.stringify(req.body)).toString();
  try {
    const role = await obtainRole(code);
    if (role) {
      res.status(200).json({ data: role });
    } else {
      res.status(404).json({ error: 'No role found for access code' });
    }
  } catch (e) {
    res.status(500).json({ error: 'bad request' });
  }
}
