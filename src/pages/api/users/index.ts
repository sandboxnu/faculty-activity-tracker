import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, getUserForQuery, createUser } from '@/services/user';
import { CreateUserDto, UpdateUserDto } from '@/models/user.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      // POST /users => create new activity
      await handlePost(req, res);
      break;
    case 'GET':
      const param = JSON.parse(JSON.stringify(req.query)) as UpdateUserDto;
      if (Object.keys(param).length == 0) {
        // GET /users => fetch activities
        await handleGet(res);
        break;
      } else {
        //  GET /users?[Query]=[param]
        await handleGetUserQuery(param, res);
        break;
      }
    // not a POST GET request so shouldn't be using this route
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newUserDto = JSON.parse(JSON.stringify(req.body)) as CreateUserDto;
  const newUser = await createUser(newUserDto);
  res.status(200).json({ data: newUser });
}

async function handleGet(res: NextApiResponse) {
  const users = await getAllUsers();
  res.status(200).json({ data: users });
}

async function handleGetUserQuery(query: UpdateUserDto, res: NextApiResponse) {
  try {
    const users = await getUserForQuery(query);
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(404).end('invalid query parameters');
  }
}
