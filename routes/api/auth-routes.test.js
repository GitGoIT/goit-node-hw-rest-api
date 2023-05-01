const mongoose = require('mongoose');
const request = require("supertest");

const app = require("../../app");

const { User } = require("../../models/user");
const { beforeEach } = require('node:test');
const { string } = require('joi');

const { DB_HOST_TEST, PORT } = process.env;

describe("test /api/users/register(login) route", () => {
    let server = null;
    beforeAll(async () => {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);

    });

    afterAll(async () => {
        await User.deleteMany({})
        server.close();
        await mongoose.connection.close();
    });

    beforeEach(() => { });

    // afterEach(async() => {
    //     await User.deleteMany({})
    // })

    test("test register route with correct data", async () => {
        const registerData = {
            email: "test@test.com",
            password: "123456",
            subscription: "starter",
        };

        const res = await request(app).post("/api/users/register").send(registerData);
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe(registerData.email);
        expect(res.body.subscription).toBe(registerData.subscription);

        const user = await User.findOne({ email: registerData.email });
        expect(user.subscription).toBe(registerData.subscription);
    });

    test("test login route with correct data", async () => {
        const loginData = {
            email: "test@test.com",
            password: "123456"
        };

        const res = await request(app).post("/api/users/login").send(loginData);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.user).toEqual(expect.objectContaining({
            email: expect.any(String),
            subscription: expect.any(String),
        }));

        const user = await User.findOne({ email: loginData.email });
        expect(user.token).toEqual(expect.any(String));
        expect(res.body.user).toEqual(expect.any(Object));
        expect(user.subscription).toBe("starter" || "pro" || "business");       
    });
});