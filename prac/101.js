
//create Server:

// let http = require('http')
// http.createServer(function (req, res) {
//   res.write("hello server!")
//   res.end()
// }).listen(6000)


//reads a local file synchronously using the fs module
// const fs = require('fs')
// fs.readFile('sample.txt', 'utf8', (error, data) => {
//   if (error) {
//     console.log("error", error)
//     return
//   }

//   console.log('data', data)
// })


//OS module that gets the computer's platform and architecture.
// let os = require('os')
// console.log("Computer OS Platform: ", os.platform())
// console.log("Computer OS architecture: ", os.arch())

//code retrieves the last portion of a given file path and prints that value to the console:
// const path = require('path')
// let result = path.basename('/content/index/home.html')
// console.log('result ', result)

//use util.format() method as follows:
// let util = require('util')
// let str = 'The loop has executed %d time(s).';

// for (let i = 1; i <= 10; i++) {
//   console.log(util.format(str, i)); //outputs 'The loop has executed i time(s)'
// }

//use url.parse
// const url = require('url')
// let webAddress = 'http://localhost:2000/index.html?lastName=Kent&firstName=Clark';
// let qry = url.parse(webAddress, true)
// let qryData = qry.query
// console.log(qryData.lastName)
