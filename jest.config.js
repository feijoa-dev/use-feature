const { env } = require('process')

require('dotenv').config({path: "./env.test"})

module.exports = {
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  "testEnvironment": "jsdom"
}