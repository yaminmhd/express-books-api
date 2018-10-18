const express = require("express");
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

const addFakeBooks = async () => {
  const author = new Author({
    name: "kim",
    age: 20
  });

  const savedAuthor = await author.save();

  const book = new Book({
    title: "Game of thrones",
    author: `${savedAuthor._id}`
  });

  await book.save();
};

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
});

test("GET /authors should display all authors", async () => {
  await addFakeAuthors();
  const response = await request(app).get("/authors");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
});

test("GET /books should display all books", async () => {
  await addFakeBooks();
  const response = await request(app).get("/books");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
});

test("GET /index should display welcome message", async () => {
  const response = await request(app).get("/");

  expect(response.status).toBe(200);
  expect(response.body.message).toEqual("hello express-blog-api");
});
