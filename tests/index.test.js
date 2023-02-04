const mongoose = require("mongoose");
const app = require("../src/app");
const request = require("supertest");
const {registerUser, loginUser, getUserProfile, getUsers} = require("./auth");
const {loginUserNote, createNote, getNotes, getNoteById, updateNote, deleteNote} = require("./notes");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.APP_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});


afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /", () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    })
});

// Test for Authentication
// describe("POST /api/users/register", registerUser);
describe("POST /api/users/login", loginUser);
describe("GET /api/users/profile", getUserProfile);
describe("GET /api/users/get", getUsers);


// Test for Notes
describe("POST /api/users/login", loginUserNote);
describe("POST /api/notes/create", createNote);
describe("GET /api/notes/get", getNotes);
describe("GET /api/notes/get/:id", getNoteById);
describe("PATCH /api/notes/update/:id", updateNote);
describe("DELETE /api/notes/delete/:id", deleteNote);
