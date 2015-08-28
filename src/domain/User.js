var currentUser, authToken;

module.exports = {
    getActiveUser: () => currentUser,
    setActiveUser: (user) => { currentUser = user },

    setToken: (token) => { authToken = token },
    getToken: () => authToken
}
