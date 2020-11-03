const fs = require('fs')
const axios = require('axios')

let readContent = (filename) => {
    try {
        console.log('fetching data from : ' + filename)
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
        return ''
    }
}

let appendContent = (filename, text) => {
    try {
        fs.appendFileSync(filename, text)
    } catch(err) {
        console.error(err)
    }
}


let args = process.argv.slice(2)
let url = ''
url = args[0]

const BASE_URL = 'http://' + url
const PATH = '/'

let api = axios.create({
    baseURL: BASE_URL,
})
console.log({'get from': BASE_URL + PATH})
api.get(PATH)
.then(response => {
    console.log(response.data)
    appendContent('out.txt', response.data)
})
.catch(error => {
    console.error(error)
    console.log(error.data)
})