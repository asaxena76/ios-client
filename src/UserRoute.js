var Relay = require("react-relay");

var { Route } = Relay;

class UserRoute extends Route {

    // static queries = {
    //     user: (Component) => Relay.QL`
    //         query {
    //             user(id: $userId) {
    //                 ${Component.getFragment('user')}
    //             }
    //         }
    //     `
    // };

    // static paramDefinitions = {
    //     userId: { required: true }
    // };

    // static routeName = 'ProfileRoute';

}

UserRoute.routeName = "ProfileRoute";

module.exports = UserRoute
