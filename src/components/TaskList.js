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
      loaded: false,
      selectedTab: 'all'
    };
  },

  componentWillMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    request
      .get("https://ci.effektif.com/api/v1/effektif/tasks")
      .set("Authorization", this.props.token)
      .end((error, response) => {
        console.log(error, response);
        this.setState({
          dataSource: ds.cloneWithRows(response.body),
          loaded: true
        });
      });

  },

  fetchInboxData: function() {
  	// we should change the data source when switching tabs
    request
      .get("https://ci.effektif.com/api/v1/effektif/tasks?involvement%5B%5D=assignedToMe&involvement%5B%5D=imaCandidate&involvement%5B%5D=iStarted&completed=false")
      .set("Authorization", this.props.token)
      .end((error, response) => {
        console.log(error, response);
        this.setState({
          dataSource: ds.cloneWithRows(response.body),
          loaded: true
        });
      });

  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
    	// insert tabbar here

    	<TabBarIOS
	        tintColor="white"
	        barTintColor="darkslateblue">

	        <TabBarIOS.Item
	          title="Inbox"
	          icon={{uri: base64Icon, scale: 3}}
	          selected={this.state.selectedTab === 'inbox'}
	          onPress={() => {
	            this.setState({
	              selectedTab: 'inbox',
	            });
	          }}>
			  {this.renderInbox()}
        	</TabBarIOS.Item>

			<TabBarIOS.Item
	          title="All"
	          icon={{uri: base64Icon, scale: 3}}
	          selected={this.state.selectedTab === 'all'}
	          onPress={() => {
	            this.setState({
	              selectedTab: 'all',
	            });
	          }}>
			  {this.renderInbox()}
        	</TabBarIOS.Item>
        </TabBarIOS>
    	// end of tabbar stuff
      
    );
  },

  renderInbox: function() {
  	// loaded set to false before?
  	this.fetchInboxData()

  	return <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTask}
        style={styles.listView}
      />
  },

  renderAll: function() {
  	// loaded set to false before?
  	this.fetchData()

  	return <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTask}
        style={styles.listView}
      />
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
