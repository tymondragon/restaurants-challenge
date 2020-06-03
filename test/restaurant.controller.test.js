const db = require('../server/knex');
const endpoints = require('../restaurants/restaurants.controller')
const chai = require("chai")
const sinonChai = require("sinon-chai")
chai.use(sinonChai)

const expect = chai.expect
const nock = require('nock')
const sinon = require('sinon')

const mockRequest = (mountPath) => {
  const req = {}
  req.baseUrl = mountPath
  req.path = '/'
  req.session = {}
  req.hypermediaBase = 'https://test.host'
  return req
}

const mockResponse = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub()
  res.end = sinon.stub()
  return res
}

describe('restaurant endpoints', () => {
  describe(".urlBuilder", () => {
    const API_key = process.env.GOOGLE_API_KEY
    it.only('builds the correct url string', async () => {
      const string = endpoints.urlBuilder('name,address', 'ABC123')

      expect(string).to.eq(`http://test.host/?place_id=ABC123&fields=name,address&key=${API_key}`)
    })
  })

  describe(".fetchAPI", () => {
    it("makes the correct request to the api", async () => {
      const serverResponse = { some: "data" };
      const fakeInternet = nock("http://test.host")
        .get("/?place_id=ABC123&fields=name,address&key=234DEF")
        .reply(200, serverResponse);

      const response = await endpoints.fetchApi("name,address", "234DEF");

      expect(fakeInternet.isDone()).to.eq(true);
      expect(response).to.deep.equal(serverResponse);
    });
  });
})