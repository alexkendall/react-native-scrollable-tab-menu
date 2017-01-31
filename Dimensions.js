// @flow
import {
  Dimensions,
  Platform,
} from 'react-native';

class CustomDimensions {
  static windowHeight(): number {
    return Dimensions.get('window').height
  }
  static windowWidth(): number {
    return Dimensions.get('window').width
  }
  static contentHeight(): number {
    let offset: number = Platform.OS == "android" ? 105.0 : 80.0
    return this.windowHeight() - offset
  }
}

module.exports = CustomDimensions
