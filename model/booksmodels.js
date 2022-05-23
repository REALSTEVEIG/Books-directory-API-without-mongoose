const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(__dirname), 'data', "book.json")

const getBooksFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err)
            cb([]);
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Books {
    constructor(id, title, author, published, price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.published = published;
        this.price = price
    }

    save() {
        getBooksFromFile(Books => {
            if (this.id) {
                const existingBookIndex = Books.findIndex(
                    prod => prod.id === this.id
                );
                const updatedBooks = [...Books]
                updatedBooks[existingBookIndex] = this
                fs.writeFile(p, JSON.stringify(updatedBooks), err => {
                    console.log(err);
                });
            } else {
                this.id = (new Date()).getTime().toString();
                Books.push(this);
                fs.writeFile(p, JSON.stringify(Books), err => {
                    
                })
            }
        })
    }

    static deleteById(id) {
        getBooksFromFile(Books => {
            const updatedBooks = Books.filter(prod => prod.id !==id)
            fs.writeFile(p, JSON.stringify(updatedBooks), err => {

            })
        })
    }
    static fetchAll(cb) {
        getBooksFromFile(cb)
    }

    static findById(id, cb) {
        getBooksFromFile(Books => {
            const Book = Books.find(p => p.id === id)
            cb(Book)
        })
    }
}