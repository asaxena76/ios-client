var React = require("react-native");
var Relay = require("react-relay");
var { Icon } = require('react-native-icons');

var { Image, StyleSheet, Text, View } = React;

var User = require("../domain/User");

module.exports = React.createClass({

    displayName: "Avatar",

    contextTypes: {
        token: React.PropTypes.string.isRequired
    },

    propTypes: {
        user: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            firstName: React.PropTypes.string.isRequired,
            lastName: React.PropTypes.string.isRequired,

            color: React.PropTypes.string
        })
    },

    render: function() {
        if (!this.props.user){
          return this.renderNoAssignedUser();
        }
        else if(this.props.user.color) {
          return this.renderInitials();
        }
        return this.renderUserImage();
    },

    renderInitials: function() {
        return (
            <View style={{
                justifyContent: 'center',
                backgroundColor: this.props.user.color,
                height: 42,
                width: 42
            }}>

                <Text style={styles.avatarInitials}>
                    { this.props.user.firstName[0].toUpperCase() }
                    { this.props.user.lastName[0].toUpperCase() }
                </Text>
            </View>
        );
    },

    renderNoAssignedUser: function (){
      return (
        <Icon
            style={{
              width: 42,
              height: 42,
              backgroundColor: '#e5e5e5' 
            }}
            name={ `fontawesome|user` }
            size={ 15 }
            color="#fff" />
      );
    },

    renderUserImage: function() {
        return (
            <Image
                style={{ width: 42, height: 42 }}
                source={{ uri: `https://ci.effektif.com/api/v1/effektif/users/${this.props.user.id}/picture?token=${this.context.token}` }} />
        );
    }

});

var styles = StyleSheet.create({
    avatarInitials: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    'justifyContent': 'center'
  },
})
