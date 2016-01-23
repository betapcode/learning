/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SignIn from './src/components/signin';
import Button from './src/components/button';

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);


class LthAuthentication extends ParseComponent {
  constructor() {
    super();
    console.log("Call constructor");
  }

  componentWillMount() {
    console.log("Call componentWillMount");
    Parse.initialize("kAiF72pMYerS8RlqVajUlBRmDYafWFBG7kec8BQC", "flB2dXhmpQrOCGuk0L3l0PtSPrUDClebz5Z2K3TC");
  }

  // By extending ParseComponent, it is possible to observe queries
  observe(props, state) {
    console.log("call oberver");
    return {
      //items: new Parse.Query('Item')
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SignIn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LthAuthentication', () => LthAuthentication);
