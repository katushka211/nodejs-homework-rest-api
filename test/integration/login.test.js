require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);
const { DB_TEST_URI } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
    await User.deleteMany();
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });
  test("should login user", async () => {
    await supertest(app).post("/api/auth/register").send({
      email: "example@test.ua",
      password: "123456789",
    });
    const response = await supertest(app).post("/api/auth/login").send({
      email: "example@test.ua",
      password: "123456789",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
