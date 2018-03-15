const Book = require('./models/books');
const mongoose = require('mongoose');

const data = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Learning JavaScript Design Patterns',
    description: 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Eloquent JavaScript, Second Edition',
    description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Programming JavaScript Applications',
    description: 'Take advantage of JavaScript\'s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that\'s easier-yes, easier-to work with as your code base grows.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Understanding ECMAScript 6',
    description: 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'You Don\'t Know JS',
    description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the "You Don’t Know JS" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Git Pocket Guide',
    description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.'
  }

];

const seedDB = async function(){
  //remove all books
  try {
    await Book.remove({});
    console.log('Removed all the books');
  } catch (e) {
    console.log(err);
  }

  //add a few books
  data.forEach(async function(seed){
    try {
      await Book.create(seed)
      console.log('Added a book');
    } catch (e) {
      console.log(err);
    }
  });
}

module.exports = seedDB;