const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'true bruh',
    likes: 5
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'my dawg',
    likes: 11
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (initialBlogs) => {
  initialBlogs.reduce((most, blog) => {
    return (most.likes || 0) > blog.likes ? most : blog
  })
}

console.log(favoriteBlog)

module.exports = {
  totalLikes,
  favoriteBlog,
  nonExistingId,
  blogsInDb,
  initialBlogs
}
