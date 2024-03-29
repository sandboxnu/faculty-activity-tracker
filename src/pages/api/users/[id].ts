import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUser, deleteUser } from '@/services/user';
import { CreateUserDto, UpdateUserDto } from '@/models/user.model';
import { bigintToJSON } from '@/shared/utils/misc.util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  if (!id || isNaN(parseInt(id.toString()))) {
    res.status(400).json({ error: 'Missing/invalid user id.' });
  } else {
    switch (req.method) {
      case 'GET':
        // GET /users[id] => fetch user with specified id
        await handleGet(parseInt(id.toString()), res);
        break;
      case 'PUT':
        // PUT /users[id] => update user of specified id
        await handlePut(parseInt(id.toString()), req, res);
        break;

      case 'DELETE':
        // DELETE /activity[id] => delete activity with specified id
        await handleDelete(parseInt(id.toString()), res);
        break;
      // not a GET or PUT request so shouldn't be using this route
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

async function handleGet(id: number, res: NextApiResponse) {
  const user = await getUserById(id);
  if (user) {
    res.status(200).json({ data: bigintToJSON(user) });
  } else {
    res.status(404).end(`user with id: ${id.toString()} Not Found`);
  }
}

async function handlePut(
  id: number,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //const newUserDto = JSON.parse(JSON.stringify(req.body)) as UpdateUserDto;
  const newUserDto = bigintToJSON(req.body) as UpdateUserDto;
  newUserDto.dateModified = BigInt(Date.now());
  try {
    const user = await updateUser(parseInt(id.toString()), newUserDto);
    res.status(200).json({ data: bigintToJSON(user) });
  } catch (e) {
    res.status(500).json({ error: 'bad request' });
  }
}

async function handleDelete(id: number, res: NextApiResponse) {
  try {
    const user = await deleteUser(id);
    res.status(200).json({ data: bigintToJSON(user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "User delete endpoint needs at least 1 valid argument. Valid args are {'id'}",
    });
  }
}
