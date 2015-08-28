/**
 * Effektif iOS Client
 * https://github.com/effektif/ios-client
*/

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var request = require("superagent");

var PAGE_SIZE = 25;

var Task = require("./Task");

var ds =  new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

module.exports = React.createClass({

  displayName: 'Tasks',

  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false
    };
  },

  componentWillMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    request
      .get("http://localhost:8080/api/v1/effektif/tasks")
      .set("Authorization", this.props.token)
      .end((error, response) => {
        console.log(error, response);
        this.setState({
          dataSource: ds.cloneWithRows(response.body),
          loaded: true
        });
      });

    // return MOCKED_TASK_DATA;
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTask}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          Loading Effektif...
        </Text>
      </View>
    );
  },

  renderTask: function(task) {
    return <Task { ...task } />
  }
});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: 'white'
  },

  loadingContainer: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 50
  },
})

