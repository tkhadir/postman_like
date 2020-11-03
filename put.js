const axios = require('axios')
const fs = require('fs')

let readContent = (filename) => {
    try {
        console.log('fetching data from : ' + filename)
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
        return ''
    }
}

let body = readContent('input.json')

let url = ''
axios.put(url, JSON.parse(body))
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.error(error)
    console.log(error.data)
})