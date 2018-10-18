const request = require("supertest");

const MongodbMemoryServer = require("mongodb-memory-server").default;
const mongod = new MongodbMemoryServer();
const mongoose = require("mongoose");
const Author = require("../models/author");
const Book = require("../models/book");

const app = require("../app");

async function addFakeAuthors() {
  const author1 = new Author({
    name: "paulo",
    age: 49
  });

  await author1.save();

  const author2 = new Author({
    name: "john",
    age: 50
  });

  await author2.save();
}

beforeAll(async () => {
  jest.setTimeout(120000);
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

beforeEach(async () => {
  mongoose.connection.db.dropDatabase();
  await addFakeAuthors();
});

test("POST / should create new book", async () => {
  const name = "kim";
  const age = 20;
  const author = new Author({
    name,
    age
  });

  const savedAuthor = await author.save();

  const book = new Book({
    title: "Game of Thrones",
    author: `${savedAuthor._id}`
  });

  const postResult = await request(app)
    .post("/books")
    .send(book);

  const response = await request(app).get("/books");

  expect(postResult.status).toBe(201);
  expect(postResult.header["content-type"]).toContain("application/json");
  expect(response.body[0].title).toEqual("Game of Thrones");
  expect(response.body[0].author.age).toEqual(age);
  expect(response.body[0].author.name).toEqual(name);
});

test("PUT /books/:id should update selected book", async () => {
  const name = "lisa";
  const age = 50;
  const author = new Author({
    name,
    age
  });
  const savedAuthor = await author.save();

  const book = new Book({
    title: "Game of Thrones",
    author: `${savedAuthor.id}`
  });
  const savedBook = await book.save();

  const newObject = {
    title: "Harry Potter"
  };

  const response = await request(app)
    .put(`/books/${savedBook.id}`)
    .send(newObject);

  expect(response.status).toEqual(200);
  expect(response.body.title).toEqual(newObject.title);
  expect(response.body.message).toEqual(`update book with id ${book.id}`);
});

test("DELETE /books/:id should delete selected book", async () => {
  const name = "lisa";
  const age = 50;
  const author = new Author({
    name,
    age
  });
  const savedAuthor = await author.save();

  const book = new Book({
    title: "Game of Thrones",
    author: `${savedAuthor.id}`
  });
  const savedBook = await book.save();

  const response = await request(app).delete(`/books/${savedBook.id}`);

  expect(response.status).toEqual(200);
  expect(response.body.title).toEqual("Game of Thrones");
  expect(response.body.author).toEqual(savedAuthor.id);
  expect(response.body.message).toEqual(`delete book with id ${savedBook.id}`);
});
