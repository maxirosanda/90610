const listNumbers = (...numbers) => {
    const types = numbers.map(number => typeof number);
    const isValid = types.every(type => type === 'number');
    if(!isValid){
        console.log("Invalid parameters",types)
        process.exit(-4)
    }
}


process.on("exit",code => {
    if(code === -4){
        console.log("Server is stopping : Invalid parameters")
        return
    }
    console.log(`Server is stopping with code ${code}`)
})


listNumbers(12,12,34,12)