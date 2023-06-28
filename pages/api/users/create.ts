import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createUser } from '../../../lib/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'> | string>
) {
  if (req.method === 'POST') {
    if (!req.body?.email || !req.body?.password) {
      return res.status(400).json('Bad request')
    }

    const user = await createUser({
      email: req.body.email,
      password: req.body.password,
    })
    if (user && user.id) {
      const { password, ...userWithoutPasword } = user
      return res.status(200).json(userWithoutPasword)
    } else {
      return res.status(500).send('Failed to create user')
    }
  } else {
    return res.status(400).send('Bad request')
  }
}
