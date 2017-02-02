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
    titles: React.PropTypes.array.isRequired,
    menuFontStyle: Text.propTypes.style,
    blendSpeed: React.PropTypes.number,
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
        <View style={[{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "transparent"}, this.props.style]}>
          {this.props.titles.map((title, i) => {
            return (
              <TouchableOpacity
                key={i + "menuItem"}
                style={{marginBottom: 20}}
                onPress={()=> {
                  this.props.goToPage(i)
                }}
              >
                <Text style={[styles.text, this.props.menuFontStyle]}>{this.props.titles[i]}</Text>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }
}

const styles: any = StyleSheet.create({
  text: {
    fontSize: 19,
    backgroundColor: "transparent",
    color: "black",
    textAlign: "center"
  },
})


export default Menu
