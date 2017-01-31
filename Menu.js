// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'
let Dimensions = require('./Dimensions')

class Menu extends Component {

  static propTypes: Object = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    titles: React.PropTypes.array
  }

  state: {
    open: boolean
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    return (
        <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "transparent", alignItems: "center", justifyContent: "center"}}>
          {this.props.tabs.map((tab, i) => {
            return (
              <TouchableOpacity
                key={i + "menuItem"}
                style={{marginBottom: 20}}
                onPress={()=> {
                  this.props.goToPage(i)
                }}
              >
                <Text style={styles.text}>{this.props.titles[i]}</Text>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 19,
    fontFamily:"Helvetica Neue",
    fontWeight: "300",
    backgroundColor: "transparent",
    color: "black",
    textAlign: "center"
  },
  footer: {
    height: 100,
    borderTopWidth: 1,
  }
})


export default Menu
