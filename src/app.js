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
} = React;

var User = require("./domain/User");
var Login = require("./components/Login");
var Avatar = require("./components/Avatar");
var Tasks = require("./components/Tasks");

// var Relay = require("react-relay");

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

  getInitialState: function() {
    return {
      // hasLogin: !!User.getToken()
      hasLogin: true
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        { this.renderContent() }
      </View>
    );
  },

  renderContent: function() {
    if(this.state.hasLogin) {
      return this.renderAvatar();
    }

    return this.renderLogin();
  },

  renderLogin: function() {
    return (
      <Login onLogin={ this.handleLogin } />
    );
  },

  handleLogin: function() {
    this.setState({
      hasLogin: true
    });
  },

  renderAvatar: function() {
    var user = User.getActiveUser();

    return (
      <View>
        <Tasks/>
      </View>
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
