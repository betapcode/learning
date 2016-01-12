'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var SearchResults = require('./SearchResults');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});


var SearchPage = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions


  getInitialState: function() {
    return {
      searchString: 'Bay Area',
      isLoading: false,
      message: '',
      queryName: null, 
      queryGeo: {},
    };
  },

  observe: function(props, state) {
    var listingQuery = (new Parse.Query('Listing')).ascending('price');

    if (state.queryName) {
      listingQuery.equalTo('place_name', state.queryName.toLowerCase());
    } else {
      if (state.queryGeo && state.queryGeo.latitude && state.queryGeo.longitude) {
        var geoPoint = new Parse.GeoPoint({
          latitude: state.queryGeo.latitude, 
          longitude: state.queryGeo.longitude, 
        });
        listingQuery.withinMiles('location', geoPoint, 25);
      }
    }
    return state.isLoading ?  { listings: listingQuery } : null;
  },

  

  _executeQuery: function(nameSearchQuery, geoSearchQuery) {
    this.setState({ 
      isLoading: true, 
      message: '', 
      queryName: nameSearchQuery,
      queryGeo: geoSearchQuery, 
    });
  },

  onSearchPressed: function() {
    this._executeQuery(this.state.searchString, {});
  },

  onLocationPressed: function() {
    navigator.geolocation.getCurrentPosition(
      location => {
        console.log("My location :" + location);
        console.log(location);

        this._executeQuery(
            null,
            {
              latitude : location.coords.latitude,
              longitude: location.coords.longitude, 
            }
          );
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your locaton: ' + error
        });
      });
  },

  onSearchTextChanged: function(event) {
    this.setState({ searchString: event.nativeEvent.text });
  },

  componentDidUpdate : function(prevProps, prevState) {
    if (prevState.isLoading && (this.pendingQueries().length===0)) {
      this.setState({isLoading: false});
      //2 
      if (this.queryErrors() !== null) {
        this.setState({messge:'There was a problem fetching the results!'});
      } else {
        if (this.data.listings.length === 0) {
          this.setState({message: 'No search results found!'});
        } else {
          this.props.navigator.push({
            title: 'Results', 
            name: 'Results', 
            component: SearchResults, 
            passProps: {listings: this.data.listings}
          });    
        }
      }
    }
  },

  render: function() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);

    console.log(this.data.listings);


    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via name or postcode'
            value={this.state.searchString}
            onChange={this.onSearchTextChanged}/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
            onPress={this.onLocationPressed}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('image!house')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
});

module.exports = SearchPage;
