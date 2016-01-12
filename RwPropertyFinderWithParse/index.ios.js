'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');

Parse.initialize(
  'msfIQIQEaV5HftZgUOH40mu6GQiquHk9wvoZTlfO', //APP_ID
  'N40lCXccF1JJ94bZreYIWfAR4esujpaStKkAsbhd' //KEY
);

var SearchPage = require('./SearchPage');
var {
  AppRegistry,
  StyleSheet,
  Navigator, 
} = React;

var PropertyFinderApp = React.createClass({
  render: function() {
    return (
        
        /*
        <Navigator 
          initialRoute={{name:'PF', component: SearchPage}}

          renderScene={(route, navigator) => {
              // count the number of func calls
              console.log(route, navigator); 

              if (route.component) {

                  var allProps = {};

                  if (route.passProps) {
                    var {listings, property} = route.passProps;
                    var allProps = route.passProps;
                  }

                  allProps.navigator = navigator;

                  var ret =  React.createElement(route.component,allProps);
                  return ret;
              }
          }}
        />

        */

        
        <React.NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Property Finder',
            component: SearchPage,
          }}/>
        
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('test1', () => PropertyFinderApp);
