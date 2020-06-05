require('dotenv').config({
  path: require('path').join(__dirname, '../.env.test')
})
const db = require('../server/knex');
const endpoints = require('../server/restaurants/restaurants.controller')
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
  beforeEach(() => db('restaurants').del());
  beforeEach(async () => {
    await db('restaurants').insert({
      id: 1,
      name: 'fancy restaurant',
      place_id: 'id1'
    }).returning('*');
    req = mockRequest('/restaurants');
    res = mockResponse();
  })
  describe(".urlBuilder", () => {
    const API_key = process.env.GOOGLE_API_KEY
    it('builds the correct url string', async () => {
      const string = endpoints.urlBuilder('name,address', 'ABC123')

      expect(string).to.eq(`http://test.host/maps/api/place/details/json?place_id=ABC123&fields=name,address&key=${API_key}`)
    })
  })

  describe(".fetchAPI", () => {
    it("makes the correct request to the api", async () => {
      const serverResponse = { some: "data" };
      const fakeInternet = nock("http://test.host")
        .log(console.log)
        .get('/maps/api/place/details/json')
        .query(true)
        .reply(200, serverResponse);

      const response = await endpoints.fetchApi("name,address", "234DEF");

      expect(fakeInternet.isDone()).to.eq(true);
      expect(response).to.deep.equal(serverResponse);
    });
  });

  describe("list", () => {
    let restaurantsDetails;
    beforeEach(() => restaurantsDetails = sinon.stub(endpoints, "fetchApi"))
    afterEach(() => restaurantsDetails.restore())
    it('returns a serialized list of detailed restaurants', async () => {
      const serverResponse = {
        "result": {
          "name": "Fancy Restaurant",
          "opening_hours": {
            "open_now": true,
            "periods": [
              {
                "close": {
                  "day": 2,
                  "time": "2100"
                },
                "open": {
                  "day": 2,
                  "time": "1100"
                }
              }
            ]
          },
          "rating": 4.8
        },
      }

      const fakeInternet = nock("http://test.host")
        .log(console.log)
        .get('/maps/api/place/details/json')
        .query(true)
        .reply(200, serverResponse);
      restaurantsDetails.returns(serverResponse)
      await endpoints.list(req, res)
      expect(res.json).to.have.been.calledWith(
        sinon.match({
          restaurants: [
            {
              id: 1,
              name: 'Fancy Restaurant',
              address: null,
              phoneNumber: null,
              openNow: true,
              hoursOfOperationPeriods: ["11 am - 9 pm T", "Closed Su, M, W, Th, F, Sat"],
              rating: 4.8,
              website: null
            }
          ]
        })
      )
    })
  })

  describe("getRestaurantById", () => {
    let restaurantsDetails;
    beforeEach(() => restaurantsDetails = sinon.stub(endpoints, "fetchApi"))
    afterEach(() => restaurantsDetails.restore())
    it('returns a serialized response', async () => {
      req.params = {
        restaurantId: 1
      };
      const serverResponse = {
        "result": {
          "name": "Fancy Restaurant",
          "opening_hours": {
            "open_now": true,
            "weekday_text": [
              "Monday: Closed",
              "Tuesday: 11:00 AM – 7:00 PM",
              "Wednesday: 11:00 AM – 7:00 PM"
            ]
          },
          "rating": 4.8
        },
      }

      const fakeInternet = nock("http://test.host")
        .log(console.log)
        .get('/maps/api/place/details/json')
        .query(true)
        .reply(200, serverResponse);
      restaurantsDetails.returns(serverResponse);

      await endpoints.getRestaurantById(req, res)
      expect(res.json).to.have.been.calledWith(
        sinon.match({
              id: 1,
              name: 'Fancy Restaurant',
              address: null,
              phoneNumber: null,
              openNow: true,
              hoursOfOperationText: [
                'Monday: Closed',
                'Tuesday: 11:00 AM – 7:00 PM',
                'Wednesday: 11:00 AM – 7:00 PM'
              ],
              rating: 4.8,
              website: null
        })
      )
    })
  })
})