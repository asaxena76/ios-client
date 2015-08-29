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
var Navigator = require("./components/Navigator");

var Relay = require("react-relay");

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
});


module.exports = React.createClass({

  displayName: "App",

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

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       { this.renderContent() }
  //     </View>
  //   );
  // },

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
      <Navigator onLogout={ this.handleLogout } user={ this.state.user } token={ this.state.token } />
    );
  },

  async resetStorage() {
    await AsyncStorage.setItem("user", "");
    await AsyncStorage.setItem("token", "");

    this.setState({
      user: null,
      token: null
    });
  },

  handleLogout() {
    this.resetStorage().done();
  }
});
