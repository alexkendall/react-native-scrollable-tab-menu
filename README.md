# react-native-scrollable-tab-menu
A variation of'react-native-scrollable-tab-view' with a menu interface.

##Installation
1.</br>
If your using npm : 'npm install react-native-scrollable-tab-menu'</br>
If your using yarn: 'yarn add react-native-scrollable-tab-view'
2.</br>
If your using npm : 'npm install react-native-linear-gradient'</br>
If your using yarn: 'yarn add react-native-linear-gradient'
3.
run 'react-native-link' to link packages.

##Simple Usage
```
import ScrollableTabMenu from 'react-native-scrollable-tab-menu'
...
render() {
  return (
    <ScrollableTabMenu>
      <Component1 label={"rook"} key={"ro"}  title={"Rook"}/>
      <Component2 label={"bishop"} key={"bi"} title={"Bishop"}/>
      <Component3 label={"queen"} key={"qu"} title={"Queen}/>
      <Component4 label={"king"} key={"ki"} title={"King"}/>
      <Component5 label={"pawn"} key={"pa"} title={"Pawn"}/>
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
      <Component1 key={"bb"}  title={"Basketball"}/>
      <Component2 key={"bs"} title={"Baseball"}/>
      <Component3 key={"hk"} title={"Hockey}/>
      <Component4 key={"fo"} title={"Football"}/>
      <Component5 key={"sc"} title={"Soccer"}/>
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
