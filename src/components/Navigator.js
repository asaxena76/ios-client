var React = require("react-native");

var { NavigatorIOS } = React;

var TaskList = require("./TaskList");

module.exports = React.createClass({

    childContextTypes: {
        token: React.PropTypes.string
    },

    getChildContext() {
        return {
            token: this.props.token
        }
    },

    render() {
        return <TaskList { ...this.props } />;

        return (
            <NavigatorIOS
                barTintColor="rgb(24,170,177)"
                titleTextColor="#fff"
                initialRoute={{
                    component: TaskList,
                    passProps: { user: this.props.user, token: this.props.token },
                    title: "Tasks",
                    rightButtonTitle: "Logout",
                    onRightButtonPress: () => {
                        console.log("fooo");
                    }
                }} />
        );
    }

});
