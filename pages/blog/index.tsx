import dayjs from 'dayjs'
import { Post } from '@prisma/client'
import { getPosts } from '../../lib/posts'

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-screen-xl px-4 pt-24 pb-1 mx-auto lg:px-6'>
          <h2 className='mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white'>
            All Blogs
          </h2>
        </div>
      </section>
      <section className='bg-white dark:bg-gray-900 pb-24'>
        <div className='max-w-screen-xl mx-auto px-8 space-y-8 gap-16 md:grid md:grid-cols-2 md:gap-x-32 md:gap-y-16 md:space-y-0 dark:text-white'>
          {posts.map((post) => (
            <div key={post.id}>
              <h3 className='text-2xl font-bold dark:text-white'>
                <a href={`blog/${post.id}`}>{post.title}</a>
              </h3>
              <p className='font-light text-gray-500 dark:text-gray-400'>
                {dayjs(post.createdAt).format('DD/MM/YYYY')}
              </p>
              <p className='font-normal text-xl text-gray-600 dark:text-gray-300 truncate text-ellipsis'>
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: { posts },
  }
}
