import bcrypt from 'bcrypt'
import prisma from './prisma'

export type CreateUserInput = {
  email: string
  password: string
  username?: string
  firstname?: string
  lastname?: string
  active?: boolean
}

export async function createUser(input: CreateUserInput) {
  const user = {
    ...input,
    username: input.username ?? input.email,
    password: await bcrypt.hashSync(input.password, 10),
    active: input.active ?? true,
  }

  return await prisma.user.create({
    data: user,
  })
}
