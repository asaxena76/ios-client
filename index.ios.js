/**
 * Effektif iOS Client
 * https://github.com/effektif/ios-client
*/

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var MOCKED_TASK_DATA = [
  {
    assigneeId: '55ded6d3e4b056adca2f3a83',
    candidateIds: [],
    caze: {id: '55ded6b0e4b056adca2f3a62', name: 'Code Camp 2015'},
    cazeId: '55ded6b0e4b056adca2f3a62',
    createdBy: '537f6807e4b011fbfef4e614',
    id: '55ded6c4e4b056adca2f3a7b',
    lastUpdated: '2015-08-27T09:22:12.253Z',
    name: 'Call Micheal',
    organizationId: '537f6807e4b011fbfef4e60b',
    parentId: '55ded6b0e4b056adca2f3a62',
    participantIds: ['537f6807e4b011fbfef4e614', '55ded6d3e4b056adca2f3a83']
  },
  {
    assigneeId: '55ded6d3e4b056adca2f3a83',
    candidateIds: [],
    caze: {id: '55ded6b0e4b056adca2f3a62', name: 'Code Camp 2015'},
    cazeId: '55ded6b0e4b056adca2f3a62',
    createdBy: '537f6807e4b011fbfef4e614',
    id: '55ded6c4e4b056adca2f3a7b',
    lastUpdated: '2015-08-27T09:22:12.253Z',
    name: 'Check Finance',
    organizationId: '537f6807e4b011fbfef4e60b',
    parentId: '55ded6b0e4b056adca2f3a62',
    participantIds: ['537f6807e4b011fbfef4e614', '55ded6d3e4b056adca2f3a83']
  }
];

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var iosclient = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(MOCKED_TASK_DATA),
          loaded: true
        });
      })
      .done();
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
      <View style={styles.container}>
        <Text>
          Loading Effektif...
        </Text>
      </View>
    );
  },

  renderTask: function(task) {
    return (
      <View style={styles.container}>
        <View style={styles.checkBoxContainer}>
          <Text style={styles.avatarInitials}>TR</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarInitials}>TR</Text>
        </View>
        <View style={styles.taskNameContainer}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.subtitle}>{task.caze.name}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
    marginBottom: 10
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
  avatarInitials: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    'justifyContent': 'center'
  },
  taskNameContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  title: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#128187'
  },
  subtitle: {
    fontSize: 12,
    color: '#989898'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('iosclient', () => iosclient);
