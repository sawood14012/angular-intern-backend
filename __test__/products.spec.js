var app = require('../app');
const supertest = require('supertest');

describe("Testing the Products API", () => {

	it("tests the products route and returns true for status", async () => {

		const response = await supertest(app).get('/products/api');

		expect(response.status).toBe(200);
		

	});

});