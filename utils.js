const fs = require('fs')

// module.exports = {

// }

function getViewData(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if(err) return callback(new Error('Unable to read file'))

      try {     
        const viewData = JSON.parse(contents) 

        callback(viewData)
      } catch(parseError) {
        callback(new Error('Unable to parse file'))
      }
    })
}
