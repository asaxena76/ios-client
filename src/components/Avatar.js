var React = require("react-native");
// var Relay = require("react-relay");

var { Image } = React;

var User = require("../domain/User");

module.exports = React.createClass({

    propTypes: {
        user: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            firstName: React.PropTypes.string.isRequired,
            lastName: React.PropTypes.string.isRequired,

            color: React.PropTypes.string
        }),
        token: React.PropTypes.string.isRequired
    },

    render: function() {
        if(this.props.user.color) {
            return this.renderInitials();
        }

        return this.renderUserImage();
    },

    renderInitials: function() {

    },

    renderUserImage: function() {
        return (
            <Image
                style={{ width: 42, height: 42 }}
                source={{ uri: `http://localhost:8080/api/v1/effektif/users/${this.props.user.id}/picture?token=${this.props.token}` }} />
        );
    }

})
