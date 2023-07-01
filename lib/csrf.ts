import { nextCsrf } from 'next-csrf'

const { csrf, setup } = nextCsrf({
  secret: process.env.NEXTAUTH_SECRET,
})

export { csrf, setup }
