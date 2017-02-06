# react-native-scrollable-tab-menu
A variation of 'react-native-scrollable-tab-view' with a menu interface.

<img src="https://image.ibb.co/e8rJWF/scrollable_Tab_Menu.gif" alt="Drawing" width="248px" height="441px"/>

##Installation
with yarn:
```
yarn add react-native-scrollable-tab-view
yarn add react-native-linear-gradient
react-native link
```
With npm:
```
npm install --save react-native-scrollable-tab-view
npm install --save react-native-linear-gradient
react-native link
```

##Simple Usage
```
import ScrollableTabMenu from 'react-native-scrollable-tab-menu'
...
render() {
  return (
    <ScrollableTabMenu>
      <Component1 title={"Rook"}/>
      <Component2 title={"Bishop"}/>
      <Component3 title={"Queen}/>
      <Component4 title={"King"}/>
      <Component5 title={"Pawn"}/>
    </ScrollableTabMenu>
  )
}
...
```

##Usage With Custom Props
```
import ScrollableTabMenu from 'react-native-scrollable-tab-menu'
...
render() {
  return (
    <ScrollableTabMenu
      locations={[0.0, 0.5, 1.0]}
      colors={["transparent", "white", "blue"]}  tabColor="red"
      backgroundImage={require('../images/myImage1.png')}
      menuBackgroundColor={Scheme.white(1.0)}
      menuImage={require('../images/myImage2.png')}
      menuFontStyle={{color: "red", fontSize: 20}}
      tabColor={"gray"}
    >
      <Component1 title={"Basketball"}/>
      <Component2 title={"Baseball"}/>
      <Component3 title={"Hockey}/>
      <Component4 title={"Football"}/>
      <Component5 title={"Soccer"}/>
    </ScrollableTabMenu>
  )
}
...
```

##PropTypes
<b>menuImage</b> PropTypes.any<br/>
<b>backgroundImage</b> PropTypes.any<br/>
<b>tabColor</b> PropTypes.string<br/>
<b>menuFontStyle</b> Text.propTypes.style<br/>
<b>menuContainerStyle</b> View.propTypes.style<br/>
<b>menuGradientlocations</b> PropTypes.array<br/>
<b>menuGradientColors</b> PropTypes.array<br/>
<b>blendDuration</b> React.PropTypes.number<br/>
<b>isAnimated</b> React.PropTypes.bool<br/>
