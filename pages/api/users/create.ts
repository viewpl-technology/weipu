import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createHmac } from 'node:crypto'
import { createUser } from '../../../lib/users'
import { csrf } from '../../../lib/csrf'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, 'password'> | string>
) {
  if (req.method === 'POST') {
    if (!req.body?.email || !req.body?.password || !req.body?.captcha) {
      return res.status(400).json('Bad request')
    }
    const hmac = createHmac('sha256', process.env.NEXTAUTH_SECRET as string)
    hmac.update(req.cookies['csrfSecret'] as string)
    const hex = hmac.digest('hex')

    if (
      `${req.body?.captcha}`.toLowerCase() !==
      `${hex}`.substring(0, 4).toLowerCase()
    ) {
      return res.status(400).json('Failed to pass CAPTCHA')
    }
    let user
    try {
      user = await createUser({
        email: req.body.email,
        password: req.body.password,
      })
    } catch (err: any) {
      return res.status(500).send('An error occurred when creating the user')
    }

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

export default csrf(handler)
