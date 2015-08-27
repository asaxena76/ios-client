var React = require("react-native");
var t = require("tcomb-form-native");
var superagent = require("superagent");

var Login = require("../domain/Login");
var User = require("../domain/User");

var { View, TouchableHighlight, Text, ActivityIndicatorIOS } = React;
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

    getInitialState: function() {
        return {
            loggingIn: false
        };
    },

    render: function() {
        return (
            <View style={{ padding: 15 }}>
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

    handleSubmit: function() {
        this.setState({
            loggingIn: true
        });

        var crendentials = this.refs.form.getValue();

        console.log(crendentials);

        superagent
            .post("http://localhost:8080/api/v1/users/login")
            .send(crendentials)
            // .set("Accept", "application/json")
            .end((error, response) => {
                if(error) {
                    return;
                }

                User.setActiveUser(response.body.user);
                User.setToken(response.body.token);

                this.props.onLogin();
            });
    }

});
