import { PostCategory, PostCategories } from './types'

export type GetPostsInput = {
  category: PostCategory[keyof PostCategory]
  sortBy: Record<string, 'asc' | 'desc'>
}

export async function getPosts(
  input: GetPostsInput = {
    category: PostCategories.blog,
    sortBy: { id: 'asc' },
  }
) {
  return []
}

export async function getPost(id: string) {
  return null
}

export async function getBlogIds() {
  const blogs: { id: string }[] = []

  return blogs.map((post) => ({
    params: {
      id: post.id,
    },
  }))
}
