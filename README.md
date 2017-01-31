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
      menuTitleColor={Scheme.navy()}
    >
      <Component1 label={"Basketball"} key={"bb"}  title={"Basketball"}/>
      <Component2 label={"Baseball"} key={"bs"} title={"Baseball"}/>
      <Component3 label={"Hockey"} key={"hk"} title={"Hockey}/>
      <Component4 label={"Football"} key={"fo"} title={"Football"}/>
      <Component5 label={"Soccer"} key={"sc"} title={"Soccer"}/>
    </ScrollableTabMenu>
  )
}
...
```


