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
  View,
  TabBarIOS
} = React;

var request = require("superagent");

var PAGE_SIZE = 25;

var Task = require("./Task");
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var ds =  new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

module.exports = React.createClass({

  displayName: 'Tasks',

  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false,
      loadedTasks: false,
      selectedTab: 'all'
    };
  },

  componentWillMount: function() {
    this.fetchInitialData();
  },

  fetchInitialData: function() {
    request
      .get("https://ci.effektif.com/api/v1/effektif/tasks")
      .set("Authorization", this.props.token)
      .end((error, response) => {
        console.log(error, response);
        this.setState({
          dataSource: ds.cloneWithRows(response.body),
          loaded: true,
        });
      });

  },


  fetchData: function() {
    request
      .get("https://ci.effektif.com/api/v1/effektif/tasks")
      .set("Authorization", this.props.token)
      .end((error, response) => {
        console.log(error, response);
        this.setState({
          dataSource: ds.cloneWithRows(response.body),
          loaded: true,
          loadedTasks: true
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
          loadedTasks: true
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
                loaded: false,
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
                loaded: false,
	              selectedTab: 'all',
	            });
	          }}>
			  {this.renderAll()}
        	</TabBarIOS.Item>
        </TabBarIOS>
    	// end of tabbar stuff

    );
  },

  renderInbox: function() {
  	// loaded set to false before?
    if (this.state.loadedTasks === false){
  	   this.fetchInboxData()
    }

  	return <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTask}
        style={styles.listView}
      />
  },

  renderAll: function() {
  	// loaded set to false before?
    if (this.state.loadedTasks === false){
  	   this.fetchData();
    }

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
