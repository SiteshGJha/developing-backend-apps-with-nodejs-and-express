let newPromise = new Promise((resolve, reject) => {

  setTimeout(() => {
    resolve("promise resolve")
  }, 6000)
})

console.log("before calling promise")

newPromise.then((msg) => {
  console.log("from callback receive: ", msg)
})

console.log("after calling promise")

