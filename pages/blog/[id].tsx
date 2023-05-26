import dayjs from 'dayjs'
import { Post } from '@prisma/client'
import { getBlogIds, getPost } from '../../lib/posts'

export default function Blog({ post }: { post: Post }) {
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-screen-xl px-6 pt-24 pb-1 mx-auto md:px-10'>
          <h2 className='mb-2 text-3xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white'>
            {post.title}
          </h2>
          <p className='font-light text-gray-500 dark:text-gray-400 text-center'>
            {dayjs(post.createdAt).format('DD/MM/YYYY')}
          </p>
        </div>
      </section>
      <section className='bg-white dark:bg-gray-900 pb-24'>
        <div className='max-w-screen-lg mx-auto px-6 dark:text-white md:px-10'>
          <p className='mb-2 text-xl dark:text-white'>{post.content}</p>
        </div>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await getBlogIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt.toJSON(),
        updatedAt: post.updatedAt.toJSON(),
      },
    },
  }
}
