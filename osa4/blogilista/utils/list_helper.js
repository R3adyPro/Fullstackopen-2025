const dummy = (blogs) => {
    return blogs.length === 0
        ? 1
        : blogs
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const indexOfMostLikes = blogs.reduce((maxIndex, current, currentIndex, blog) => {
        return current.likes > 
        blog[maxIndex].likes ? currentIndex : 
        maxIndex
    }, 0)
    return blogs[indexOfMostLikes]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}