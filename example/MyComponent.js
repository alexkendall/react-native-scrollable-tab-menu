import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class MyComponent extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style,]}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
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
  title: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: "white",
  },
})

export default MyComponent
