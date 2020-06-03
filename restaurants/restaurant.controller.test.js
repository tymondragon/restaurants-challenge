const chai = require("chai")
const sinonChai = require("sinon-chai")
const nock = require('nock')
const sinon = require('sinon')
const mockFile = require('mock-fs')
chai.use(sinonChai)
const expect = chai.expect

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
const db = require('../server/knex');
const endpoints = require('./restaurants.controller')

describe('restaurant endpoints', () => {
  describe('list', async () => {
    
  })
})