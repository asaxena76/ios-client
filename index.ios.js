/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

// var Relay = require('react-relay');

// var UserRoute = require('./src/UserRoute');

// Relay.injectNetworkLayer(
//     new Relay.DefaultNetworkLayer("http://localhost:8080/api/v1/effektif/graphql")
// );

// var App = require('./src/app');


// var iosclient = React.createClass({
//   render: function() {
//     return (
//       <Relay.RootContainer
//         Component={ App }
//         route={ new UserRoute({ userId: 'abc' }) } />
//     );
//   }
// });

var iosclient = require("./src/app");

AppRegistry.registerComponent('iosclient', () => iosclient);
