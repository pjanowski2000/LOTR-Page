const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost/';
const books = require('./json/books.json');
const chapters = require('./json/chapters.json');
const characters = require('./json/characters.json');
const movies = require('./json/movies.json');
const quotes = require('./json/quotes.json');

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assert.strictEqual(err, null);
    console.log("Połączono z bazą.");

    const collection_chapters = client.db('lotr').collection('chapters');
    const collection_books = client.db('lotr').collection('books');
    const collection_characters = client.db('lotr').collection('characters');
    const collection_movies = client.db('lotr').collection('movies');
    const collection_quotes = client.db('lotr').collection('quotes');
    collection_chapters
        .insertMany(chapters)
        .then(() => {
            console.log('Dane poprawnie zapisane w bazie.');
            client.close();
        })
        .catch(err => console.error(err))

    collection_books
        .insertMany(books)
        .then(() => {
            console.log('Dane poprawnie zapisane w bazie.');
            client.close();
        })
        .catch(err => console.error(err))

    collection_characters
        .insertMany(characters)
        .then(() => {
            console.log('Dane poprawnie zapisane w bazie.');
            client.close();
        })
        .catch(err => console.error(err))

    collection_movies
        .insertMany(movies)
        .then(() => {
            console.log('Dane poprawnie zapisane w bazie.');
            client.close();
        })
        .catch(err => console.error(err))

    collection_quotes
        .insertMany(quotes)
        .then(() => {
            console.log('Dane poprawnie zapisane w bazie.');
            client.close();
        })
        .catch(err => console.error(err))
});
