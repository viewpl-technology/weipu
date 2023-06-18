import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from './prisma'

type SignInInput = {
  username: string
  password: string
}

export async function signIn(input: SignInInput): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: input.username }, { email: input.username }],
    },
  })

  if (!user) {
    return null
  }

  if (bcrypt.compareSync(input.password, user.password)) {
    return user
  }

  return null
}
