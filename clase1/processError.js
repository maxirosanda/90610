process.on("uncaughtException",error => {
    console.log("error por console()")
    console.error(error)
    process.exit(1)
})


process.on("exit" , code => {
    console.log("codigo " + code)
})

console()