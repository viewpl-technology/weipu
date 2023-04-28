import { Post } from '@prisma/client'
import { getPosts } from '../../lib/posts'

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 dark:text-white'>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </section>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: { posts },
  }
}
