const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const listHelper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = listHelper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const expected = listHelper.initialBlogs.reduce((sum, blog) => sum + blog.likes, 0)
    expect(listHelper.totalLikes(listHelper.initialBlogs)).toBe(expected)
  })
})

describe('favorite blogs', () => {
  console.log(listHelper.favoriteBlog(listHelper.initialBlogs))
  test('of most likes', () => {
    const expected = listHelper.initialBlogs.reduce((most, blog) => {
      return (most.likes || 0) > blog.likes ? most : blog
    })
    expect(listHelper.favoriteBlog(listHelper.initialBlogs)).toContainEqual(expected)
  })
})

describe('api tests', () => {
  test('blogs return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body.length).toBe(listHelper.initialBlogs.length)
  })

  test('of identifier is id', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body.id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'a dude',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await listHelper.blogsInDb()
    expect(blogsAtEnd.length).toBe(listHelper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'test blog'
    )
  })

  test('set likes to 0 if not defined', async () => {
    const blogs = await api.get('/api/blogs')
    const likes = blogs.map(blog => blog.likes)

    expect(likes).toBe()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
