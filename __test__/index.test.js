const request = require("supertest");
const app = require("../app");

describe("Initializing unit tests", () => {
    it("GET /", async () => {
        const response = await request(app).get("/")
        console.log(response)
        expect(response.statusCode).toBe(200);
    })
})