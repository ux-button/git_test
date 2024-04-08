function createUser(name) {
    const instaName = '@' + name;
    let likes = 0
    function getLikes() {
        return likes
    }
    function addLike() {
        return likes++
    }
    return {
        name,
        instaName,
        getLikes,
        addLike,
    }
}

const newUser = createUser('john')
const newUserJim = createUser('jim')
console.log(newUser.getLikes());
newUser.addLike()
newUser.addLike()
console.log(newUser.getLikes());
console.log(newUserJim.getLikes());