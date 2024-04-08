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


function createUser (name) {
    const discordName = "@" + name;
  
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = function () {
        reputation++;
    }
  
    return { name, discordName, getReputation, giveReputation };
  }
  
  const josh = createUser("josh");
  josh.giveReputation();
  josh.giveReputation();
  
  console.log({
    discordName: josh.discordName,
    reputation: josh.getReputation()
  });