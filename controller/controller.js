const Book = require("../model/booksmodels")

exports.enterBook = (req, res, next) => {
    const id = req.body.id
    const title = req.body.title
    const author = req.body.author
    const updatedBook = new Book(
        id,
        title,
        author
    )
    updatedBook.save();
    res.status(200).json({message : id ? `Library Updated` : `Book added successfully`})
}

exports.getAllBooks = (req, res, next) => {
    Book.fetchAll(Books => {
        res.status(200).json({Books, count : Books.length})
    })
}

exports.getSingleBook = (req, res, next) => {
   const prodId = req.params.id
    Book.findById(prodId, Book => {
        res.json(Book)
    })
   
}

exports.updateBook = (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const author = req.body.author
    const updatedBook = new Book(
        id,
        title,
        author
    )
    updatedBook.save();
    res.status(200).json({message : id ? 'Library Updated' : `Book updated successfully`})
}

exports.deleteBooks = (req, res, next) => {
    const prodId = req.params.id
    Book.deleteById(prodId)
    res.status(200).json({message : `Record deleted successfully!`})
}

