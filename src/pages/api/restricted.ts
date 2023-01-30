// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth'
import { authOptions } from "./auth/[...nextauth]"

import { getToken } from 'next-auth/jwt'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // const session = await getServerSession(req, res, authOptions)
    // console.log(session)

    // if (session){ 
    //     console.log("user logged in")
    //     const email = session.user?.email
    //     console.log("email: ", email)
    //     res.send(`Logged in as ${email}`)
    // }
    // else {
    //     console.log("user not logged in")
    //     res.send("not logged in")
    // }


    const token = await getToken({req, secret: "sec"})
    console.log(token)
    res.send(token)
}
