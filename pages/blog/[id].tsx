import { Post } from '@prisma/client'
import { getBlogIds, getPost } from '../../lib/posts'

export default function Blog({ post }: { post: Post }) {
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-screen-xl px-4 pt-24 pb-1 mx-auto lg:px-6'>
          <h2 className='mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white'>
            {post.title}
          </h2>
        </div>
      </section>
      <section className='bg-white dark:bg-gray-900 pb-24'>
        <div className='max-w-screen-lg mx-auto dark:text-white'>
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
