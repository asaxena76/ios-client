var React = require("react-native");

var { View, StyleSheet, Text } = React;

var Avatar = require("./Avatar");

var request = require("superagent");

// var { createIconSet } = require('react-native-vector-icons');
// var glyphMap = {
//     'icon-check': 84,
//     'icon-check-checked': 47
// };
// var Icon = createIconSet(glyphMap, 'effekticon');

var { Icon, } = require('react-native-icons');

module.exports = React.createClass({

    displayName: "Task",

    contextTypes: {
        token: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            assignee: null
        };
    },

    componentWillMount: function() {
        if(!this.props.assigneeId) {
            return;
        }

        request
            .get(`http://localhost:8080/api/v1/effektif/users/${this.props.assigneeId}`)
            .set("Authorization", this.context.token)
            .end((error, response) => {
                console.log(error, response);

                this.setState({
                    assignee: response.body
                });
            });
    },

    render: function() {
        return (
          <View style={styles.container}>
            { this.renderCheckbox() }
            { this.renderAvatar() }

            <View style={styles.taskNameContainer}>
              <Text style={styles.title}>{this.props.name}</Text>
              <Text style={styles.subtitle}>{this.props.case.name}</Text>
            </View>
          </View>
        );
    },

    renderCheckbox: function() {
        var icon = this.props.completed ? "check-square-o" : "square-o"

        return (
            <View style={styles.checkBoxContainer}>
                <Icon
                    style={{ width: 42, height: 42 }}
                    name={ `fontawesome|${icon}` }
                    size={ 15 }
                    color="#fff" />
            </View>
        );
    },

    renderAvatar: function() {
        if(!this.state.assignee) {
            return;
        }

        return <Avatar user={ this.state.assignee } />;
    }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(229,229,229)'
  },
  checkBoxContainer: {
    backgroundColor: '#9cc8ca',
    height: 42,
    width: 42
  },
  avatarContainer: {
    backgroundColor: '#d960b4',
    height: 42,
    width: 42
  },
  taskNameContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  title: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#128187',
    fontFamily: "Source Sans Pro"
  },
  subtitle: {
    fontSize: 12,
    color: '#989898'
  }
});
