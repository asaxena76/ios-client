var Relay = require("react-relay");

var { Route } = Relay;

class UserRoute extends Route {

}

UserRoute.routeName = "ProfileRoute";
UserRoute.queries = {
    user: (Component) => Relay.QL`
        query {
            user(id: $userId) {
                ${Component.getFragment('user')}
            }
        }
    `,
};
UserRoute.paramDefinitions = {
    userId: { required: true }
};

module.exports = UserRoute
