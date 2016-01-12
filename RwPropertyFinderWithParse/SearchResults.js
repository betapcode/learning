'use strict';

var React = require('react-native');
var PropertyView = require('./PropertyView');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
} = React;

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

var SearchResults = React.createClass({

  getInitialState: function() {
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  },

  rowPressed: function(propertyGuid) {
    var property = this.props.listings
      .filter(prop => prop.id === propertyGuid)[0];

    this.props.navigator.push({
      title: "Property",
      name: "Property",
      component: PropertyView,
      passProps: {property: property}
    });
  },

  renderRow: function(rowData, sectionID, rowID) {
    
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url.url() }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>111111111</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
    );
  }
});


module.exports = SearchResults;
