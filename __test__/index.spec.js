var app = require('../app');
const supertest = require('supertest');

describe("Testing the INDEX API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/');

		expect(response.status).toBe(200);
		

	});

});