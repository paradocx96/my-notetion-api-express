const request = require("supertest");
const app = require("../src/app");

let token = "";

const registerUser = () => {
    test("should respond with a 201 status code", async () => {
        const response = await request(app).post("/api/users/register").send({
            name: "User Account",
            email: "useraccount@email.com",
            username: "useraccount",
            password: "useraccount",
            role: "user"
        })

        expect(response.statusCode).toBe(201);
    });
}

const loginUser = () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/users/login").send({
            username: "useraccount",
            password: "useraccount"
        })

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
        token = response.body.token;
    });
}

const getUserProfile = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/api/users/profile")
            .set({Authorization: token})

        expect(response.statusCode).toBe(200);
    });
}

const getUsers = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/api/users/get")
            .set({Authorization: token})

        expect(response.statusCode).toBe(200);
    });
}


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getUsers
}
