function newPerson(name) {
    let rank = 0;
    function getRank() {
        return rank;
    }
    function setRank() {
        return rank++;
    }
    return {
        name,
        getRank,
        setRank,
    }
}

const personJohn = newPerson('John');
console.log(personJohn.getRank());
personJohn.setRank();
console.log(personJohn.getRank())