const calculator = (function () {
    const add = function (a, b) {
        return a + b;
    }
    return { add }
})();

console.log(calculator.add(3, 6))

// console.log(calculator.add(3, 4));


function createUser (name) {
    const discordName = "@" + name;
    return { name, discordName };
}

const john = createUser("John");