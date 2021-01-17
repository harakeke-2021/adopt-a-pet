const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'pets.json')

module.exports = {
  getViewData,
  writeNewData
}

function getViewData(callback) {
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if(err) return callback(new Error('Unable to read file'))
      try {     
        const viewData = JSON.parse(contents) 
        callback(null, viewData)
      } catch(parseError) {
        callback(new Error('Unable to parse file'))
      }
    })
}

function writeNewData(newObjPetData, callback) {
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if(err) return callback(new Error('Unable to read file'))
    try {     
      const viewData = JSON.parse(contents)
      const newPetId = viewData.pets.length + 1
      newObjPetData.id = newPetId
      viewData.pets.push(newObjPetData)
      const petDataStr = JSON.stringify(viewData, null, 2)
      fs.writeFile(filePath, petDataStr, 'utf8', callback)
    } catch(parseError) {
      callback(new Error('Unable to stringify file'))
    }
  })
}