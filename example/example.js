import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import ScrollableTabMenu from 'react-native-scrollable-tab-menu'
import MyComponent from './MyComponent'

class ExampleApp extends Component {
  render() {
    return (
      <ScrollableTabMenu
        menuGradientlocations={[0.0, 1.0]}
        menuGradientColors={["gray", "white"]}

      >
        <MyComponent title={"Ace"} style={{backgroundColor: "orange"}}/>
        <MyComponent title={"King"} style={{backgroundColor: "red"}} />
        <MyComponent title={"Queen"} style={{backgroundColor: "blue"}}/>
        <MyComponent title={"Jack"} style={{backgroundColor: "green"}}/>
      </ScrollableTabMenu>
    )
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
})

export default ExampleApp
