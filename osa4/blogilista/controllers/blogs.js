const blogRouter = require('express').Router()
const blog = require("../model/blog")
const Blog = require('../model/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blog => {
            response.json(blog)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then((result) => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter