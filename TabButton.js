// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'
let Dimensions = require('./Dimensions')

class TabButton extends Component {

  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={{width: 120, height: 60, borderRadius: 30,...this.props.style}}
        onPress={this.props.onPress}
      >
        <View style={{width: 25, backgroundColor: "white", height: 2, marginTop: 0, marginLeft: 67.5}}/>
          <View style={{width: 35, backgroundColor: "white", height: 2, marginTop: 6, marginLeft: 62.5}}/>
          <View style={{width: 35, backgroundColor: "white", height: 2, marginTop: 6, marginLeft: 62.5}}/>
        <View style={{width: 25, backgroundColor: "white", height: 2, marginTop: 6, marginLeft: 67.5}}/>
      </TouchableOpacity>
    )
  }
}

const styles: any = StyleSheet.create({
  container: {
    width: Dimensions.windowWidth(),
    height: Dimensions.windowHeight(),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
});

export default TabButton
