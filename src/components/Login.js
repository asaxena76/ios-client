var React = require("react-native");
var t = require("tcomb-form-native");
var superagent = require("superagent");

var Login = require("../domain/Login");
var User = require("../domain/User");

var {
    View,
    TouchableHighlight,
    Text,
    ActivityIndicatorIOS,
    Image,
    AsyncStorage
} = React;

var { Form } = t.form;

var options = {
    fields: {
        password: {
            password: true
        }
    }
};

module.exports = React.createClass({

    displayName: "Login",

    getInitialState() {
        return {
            loggingIn: false
        };
    },

    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Image
                        style={{ width: 200 }}
                        resizeMode="contain"
                        source={ require("image!logo") } />
                </View>

                <Form
                    ref="form"
                    type={ Login }
                    options={ options } />

                <TouchableHighlight
                    style={{ backgroundColor: "rgb(24,170,177)" }}
                    underlayColor="rgb(24,170,177)"
                    onPress={ this.handleSubmit }>

                    <Text style={{ color: "#fff", padding: 15, textAlign: "center" }}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    },

    async handleSubmit() {
        this.setState({
            loggingIn: true
        });

        var crendentials = this.refs.form.getValue();

        superagent
            .post("https://ci.effektif.com/api/v1/users/login")
            .send(crendentials)
            .end((error, response) => {
                if(error) {
                    return;
                }

                AsyncStorage
                    .setItem("token", response.body.token)
                    .then(() => {
                        return AsyncStorage.setItem("user", JSON.stringify(response.body.user));
                    })
                    .then(this.props.onLogin);
            });
    }

});
