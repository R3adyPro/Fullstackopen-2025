const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', (request, response) => {
    console.log('router', request, response)
    Blog.find({})
        .then(blog => {
            response.json(blog)
        })
})

module.export = blogRouter