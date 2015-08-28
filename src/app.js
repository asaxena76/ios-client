/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} = React;

var User = require("./domain/User");
var Login = require("./components/Login");
var Avatar = require("./components/Avatar");

// var Relay = require("react-relay");

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


module.exports = React.createClass({

  getInitialState() {
    return {
      user: null,
      token: null
    };
  },

  componentDidMount: function() {
    this.loadInitialState().done();
  },

  async loadInitialState() {
    var user = await AsyncStorage.getItem("user");
    var token = await AsyncStorage.getItem("token");

    this.setState({
      user: JSON.parse(user),
      token: token
    });
  },

  render() {
    return (
      <View style={styles.container}>
        { this.renderContent() }
      </View>
    );
  },

  renderContent() {
    if(this.state.user) {
      return this.renderAvatar();
    }

    return this.renderLogin();
  },

  renderLogin() {
    return (
      <Login onLogin={ this.handleLogin } />
    );
  },

  handleLogin() {
    this.loadInitialState().done();
  },

  renderAvatar() {
    return (
      <Avatar user={ this.state.user } token={ this.state.token } />
    );
  }
});

// module.exports =  Relay.createContainer(App, {

//   fragments: {
//     user: () => Relay.QL`
//       fragment on User {
//         firstName
//       }
//     `
//   }

// });
