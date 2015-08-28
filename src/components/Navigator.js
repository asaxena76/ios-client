var React = require("react-native");

var { NavigatorIOS } = React;

var TaskList = require("./TaskList");

module.exports = React.createClass({

    render() {
        return (
            <NavigatorIOS
                barTintColor="rgb(24,170,177)"
                titleTextColor="#fff"
                initialRoute={{
                    component: TaskList,
                    title: "Tasks",
                    rightButtonTitle: "Logout",
                    onRightButtonPress: this.props.onLogout
                }} />
        );
    }

});
