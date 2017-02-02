# react-native-scrollable-tab-menu
A variation of'react-native-scrollable-tab-view' with a menu interface.

##Installation
If your using npm : 'npm install react-native-scrollable-tab-menu'</br>
If your using yarn: 'yarn add react-native-scrollable-tab-view'

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
menuImage: PropTypes.any,
backgroundImage: PropTypes.any,
tabColor: PropTypes.string,
menuFontStyle: Text.propTypes.style,
menuContainerStyle: View.propTypes.style,
menuGradientlocations: PropTypes.array,
menuGradientColors: PropTypes.array,
blendDuration: React.PropTypes.number,
isAnimated: React.PropTypes.bool,
