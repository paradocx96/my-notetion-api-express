const request = require("supertest");
const app = require("../src/app");

let token = "";
let notes = [];
let latestNoteId = "";

const loginUserNote = () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/users/login").send({
            username: process.env.AD_UN,
            password: process.env.AD_PW
        })

        expect(response.statusCode).toBe(200);
        token = response.body.token;
    });
};

const createNote = () => {
    test("should response with a 201 status code", async () => {
        const response = await request(app).post("/api/notes/create")
            .set({Authorization: token})
            .send({
                title: "Sample Note Test",
                description: "Sample text for description Test",
                favorite: true
            })

        expect(response.statusCode).toBe(201);
    });
};

const getNotes = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/api/notes/get")
            .set({Authorization: token})

        expect(response.statusCode).toBe(200);
        notes = response.body;
        notes.reverse();
        latestNoteId = notes[0]._id;
    });
}

const getNoteById = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/api/notes/get/" + latestNoteId)
            .set({Authorization: token})

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body._id).toBe(latestNoteId);
    });
}

const updateNote = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).patch("/api/notes/update/" + latestNoteId)
            .set({Authorization: token})
            .send({
                title: "Sample Note Test Updated",
                description: "Sample text for description Test Updated",
                favorite: false
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("Sample Note Test Updated");
        expect(response.body.description).toBe("Sample text for description Test Updated");
        expect(response.body.favorite).toBe(false);
    });
}

const deleteNote = () => {
    test("should response with a 200 status code", async () => {
        const response = await request(app).delete("/api/notes/delete/" + latestNoteId)
            .set({Authorization: token})

        expect(response.statusCode).toBe(200);
    });
}

module.exports = {
    loginUserNote,
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}
