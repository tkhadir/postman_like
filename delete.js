const axios = require('axios')
let url = ''
axios.delete(url)
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.error(error)
    console.log(error.data)
})