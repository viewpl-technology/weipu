import bcrypt from 'bcrypt'

export type CreateUserInput = {
  email: string
  password: string
  username?: string
  firstname?: string
  lastname?: string
  active?: boolean
}

export async function createUser(
  input: CreateUserInput
): Promise<{ id: string; password: string }> {
  const user = {
    ...input,
    username: input.username ?? input.email,
    password: await bcrypt.hashSync(input.password, 10),
    active: input.active ?? true,
  }

  return { id: '', password: '' }
}
