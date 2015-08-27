/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var Relay = require('react-relay');

var App = require('./src/app');
var Route = require('./src/UserRoute');

var Container = Relay.createContainer(App, {

  fragments: {
    user: () => Relay.QL`
      fragment on User {

      }
    `
  }

});

var iosclient = React.createClass({
  render: function() {
    return (
      <Relay.RootContainer
        Component={ Container }
        route={ new Route({ userId: 'abc' }) } />
    );
  }
});

AppRegistry.registerComponent('iosclient', () => iosclient);
