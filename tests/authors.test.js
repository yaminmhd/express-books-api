const request = require("supertest");

const MongodbMemoryServer = require("mongodb-memory-server").default;
const mongod = new MongodbMemoryServer();
const mongoose = require("mongoose");
const Author = require("../models/author");

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

test("POST /authors should create new author ", async () => {
  const name = "King";
  const age = 43;
  const postAuthor = new Author({
    name,
    age
  });
  const postResult = await request(app)
    .post("/authors")
    .send(postAuthor)

  const response = await request(app).get("/authors");

  expect(postResult.status).toBe(201);
  expect(postResult.header["content-type"]).toContain("application/json");
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3);
  expect(response.body[2].name).toEqual(name);
  expect(response.body[2].age).toEqual(age);
});

test("PUT /authors/:id should update selected author", async () => {
  const newObject = {
    name: "jane",
    age: 34
  };
  const name = "lisa";
  const age = 50;
  const author = new Author({
    name,
    age
  });
  const savedAuthor = await author.save();

  const response = await request(app)
    .put(`/authors/${savedAuthor.id}`)
    .send(newObject);

  expect(response.status).toEqual(200);
  expect(response.body.name).toEqual(newObject.name);
  expect(response.body.age).toEqual(newObject.age);
  expect(response.body.message).toEqual(
    `Author with id ${savedAuthor.id} has been updated successfully`
  );
});

test("DELETE /authors/:id should delete selected author", async () => {
  const name = "lisa";
  const age = 50;
  const author = new Author({
    name,
    age
  });
  const savedAuthor = await author.save();

  const response = await request(app).delete(`/authors/${savedAuthor.id}`);

  expect(response.status).toEqual(200);
  expect(response.body.name).toEqual(name);
  expect(response.body.age).toEqual(age);
  expect(response.body.message).toEqual(
    `Author with id ${savedAuthor.id} has been deleted successfully`
  );
});
