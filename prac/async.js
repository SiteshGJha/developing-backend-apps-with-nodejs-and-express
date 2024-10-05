// async function myAsyncFunction() {
//   let success = true
  
//   if(success) {
//     return "The operation was successful"
//   } else {
//     throw new Error("The operation was failed!")
//   }
// }

// async function executeAsyncFunction() {
//   try {
//     const result = await myAsyncFunction()
//     console.log(res)
//   }
//   catch(error) {
//     console.error(error.message)
//   }
// }

// executeAsyncFunction()


const axios = require('axios')

// axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(error => {
//     console.error('Error fetching data ', error)
//   })


async function postData() {
  try {
    let response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: 'foo',
      body: 'bar', 
      userId: 2   
    })

    console.log(response.data)
  }
  catch(error) {
    console.error("Error posting data", error)
  }
}

postData()