function factory(name) {
    const instaName = '@' + name;
    return {
        name,
        instaName,
    }
}

const newAccount = factory('alex');
console.log(newAccount.instaName)