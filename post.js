const fs = require('fs')
const axios = require('axios')
const https = require('https')

let readContent = (filename) => {
    try {
        console.log('fetching data from : ' + filename)
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
        return ''
    }
}

let listFiles = (dir) => {
    try {
        return fs.readdirSync(dir)
    } catch (err) {
        console.error('nothing found in : ' + dir)
        return []
    }
}

let bodies = []
let inputs = listFiles('./')
inputs.forEach(i => {
    if (i.endsWith('.json') 
    && !i.includes('package.json') 
    && !i.includes('package-lock.json')) bodies.push(readContent(i))
})


let args = process.argv.slice(2)
let url = ''
url = args[0]
const BASE_URL = url.includes('http') ? url :  'http://' + url
const PATH = '/'

bodies.forEach(body => {
    let api = axios.create({
        baseURL: BASE_URL,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })
    console.log({'post to': BASE_URL + PATH})
    api.post(PATH, JSON.parse(body))
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.error(error)
        console.log(error.data)
    })
})