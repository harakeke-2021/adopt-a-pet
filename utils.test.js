const path = require('path')

const utils = require('./utils')

describe('getViewData:', () => {
  test('gets file contents', (done) => {
    const testFile = path.join(__dirname, 'tests', 'valid.json')
    const expected = { message: 'hello world!' }
    
    utils.getViewData(testFile, (err, viewData) => {
      expect(viewData).toEqual(expected)
      expect(err).toBeNull()
      done()
    })
  })

  test('produces an error if the file doesn\'t exist', (done) => {
    const badPath = path.join(__dirname, 'tests', 'foo.json')
    const expected = 'Unable to read file'

    utils.getViewData(badPath, (err, viewData) => {
      expect(viewData).toBeUndefined()
      expect(err).toBeTruthy()
      expect(err.message).toMatch(expected)
      done()
    })
  })

  test('produces an error if the file isn\'t JSON', (done) => {
    const badJSON = path.join(__dirname, 'tests', 'bad.json')
    const expected = 'Unable to parse file'

    utils.getViewData(badJSON, (err, viewData) => {
      expect(viewData).toBeUndefined()
      expect(err).toBeTruthy()
      expect(err.message).toMatch(expected)
      done()
    }) 
  })
})
