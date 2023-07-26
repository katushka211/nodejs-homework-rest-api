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

  test("should return status code 200 on successful login", async () => {
    const userEmail = "example@test.ua";
    const userPassword = "123456789";
    await supertest(app).post("/api/auth/register").send({
      email: userEmail,
      password: userPassword,
    });
    const response = await supertest(app).post("/api/auth/login").send({
      email: userEmail,
      password: userPassword,
    });
    expect(response.statusCode).toBe(200);
  });

  test("should return a token on successful login", async () => {
    const userEmail = "example@test.ua";
    const userPassword = "123456789";
    await supertest(app).post("/api/auth/register").send({
      email: userEmail,
      password: userPassword,
    });
    const response = await supertest(app).post("/api/auth/login").send({
      email: userEmail,
      password: userPassword,
    });
    expect(response.body.token).toBeDefined();
  });

  test("should return an object with email and subscription fields of String type", async () => {
    const userEmail = "example@test.ua";
    const userPassword = "123456789";
    await supertest(app).post("/api/auth/register").send({
      email: userEmail,
      password: userPassword,
    });
    const response = await supertest(app).post("/api/auth/login").send({
      email: userEmail,
      password: userPassword,
    });
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });

  test("should return an error for invalid user", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "noname@test.ua",
      password: "123456789",
    });

    expect(response.statusCode).toBe(401);
  });

  test("should return an error for invalid password", async () => {
    const userEmail = "example@test.ua";
    const userPassword = "123456789";
    await supertest(app).post("/api/auth/register").send({
      email: userEmail,
      password: userPassword,
    });

    const response = await supertest(app).post("/api/auth/login").send({
      email: userEmail,
      password: "invalid",
    });

    expect(response.statusCode).toBe(401);
  });
});
