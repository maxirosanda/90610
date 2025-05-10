const suma = (...numbers) => {
    if(numbers.length === 0) return 0
    if(!numbers.every(number => typeof number === "number")) return null
    return numbers.reduce((acc,number) => acc = acc + number)
}



/* test */
let testPassed = 0
let tests = 4

console.log("Test 1: La función debe devolver null si algún parámetro no es numérico")
const resultOne = suma(12,12,"12")
if(resultOne === null){
    console.log("Test 1 pasado")
    testPassed++
}else {
    console.log("test 1 no pasado")
}

console.log("Test 2: La función debe devolver 0 si no se pasó ningún parámetro")
const resulTwo = suma()
if(resulTwo === 0) {
    console.log("Test 2 pasado")
    testPassed++
} else {
    console.log("Test 2 NO pasado")
}

console.log("Test 3: La función debe devolver la suma de los dos números")
const resultThree = suma(2,5)
if(resultThree === 7) {
    console.log("Test 3 pasado")
    testPassed++
}else {
    console.log("Test 3 NO pasado")
}

console.log("La función debe poder hacer la suma con cualquier cantidad de números")
const resultFour = suma(2,5,6,4,6)
if(resultFour === 23) {
    console.log("Test 4 pasado")
    testPassed++
}else {
    console.log("Test 4 NO pasado")
}


if (testPassed === tests) {
    console.log("Todos los tests se han pasado con éxito");
} else {
    console.log(`Se pasaron ${testPassed} tests de un total de ${tests}`);
}