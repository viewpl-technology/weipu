import { Prisma } from '@prisma/client'
import prisma from './prisma'
import { PostCategory, PostCategories } from './types'

export type GetPostsInput = {
  category: PostCategory[keyof PostCategory]
  sortBy: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>
}

export async function getPosts(
  input: GetPostsInput = {
    category: PostCategories.blog,
    sortBy: { id: 'asc' },
  }
) {
  const posts = await prisma.post.findMany({
    where: {
      category: {
        key: input.category,
      },
    },
    orderBy: input.sortBy,
  })

  return posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toJSON(),
    updatedAt: post.updatedAt.toJSON(),
  }))
}

export async function getPost(id: string) {
  const post = await prisma.post.findUniqueOrThrow({ where: { id } })
  return post
}

export async function getBlogIds() {
  const blogs = await prisma.post.findMany({
    where: { category: { key: PostCategories.blog } },
  })

  return blogs.map((post) => ({
    params: {
      id: post.id,
    },
  }))
}
