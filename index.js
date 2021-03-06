const React = require('react');
const {
  PropTypes,
  Component,
} = React;
const ReactNative = require('react-native');
const {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  InteractionManager,
  Platform,
  Image,
  Text,
} = ReactNative;
const TimerMixin = require('react-timer-mixin');
import LinearGradient from 'react-native-linear-gradient'

let menuOpacity = new Animated.Value(0.0)
let menuOffset = new Animated.Value(Dimensions.windowWidth())

const SceneComponent = require('./SceneComponent');
import Menu from './Menu'
import TabButton from './TabButton'
import Dimensions from './Dimensions'

const ScrollableTabView = React.createClass({
  mixins: [TimerMixin, ],

  propTypes: {
    // props inherited from react-native-scrollable-tab-view
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'overlayTop', 'overlayBottom', ]),
    initialPage: PropTypes.number,
    page: PropTypes.number,
    onChangeTab: PropTypes.func,
    onScroll: PropTypes.func,
    style: View.propTypes.style,
    contentProps: PropTypes.object,
    scrollWithoutAnimation: PropTypes.bool,
    locked: PropTypes.bool,
    prerenderingSiblingsNumber: PropTypes.number,
    // menu specific props
    menuImage: PropTypes.any,
    backgroundImage: PropTypes.any,
    tabColor: PropTypes.string,
    menuFontStyle: Text.propTypes.style,
    menuContainerStyle: View.propTypes.style,
    menuGradientLocations: PropTypes.array,
    menuGradientColors: PropTypes.array,
    blendDuration: React.PropTypes.number,
    isAnimated: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      tabBarPosition: 'top',
      initialPage: 0,
      page: -1,
      onChangeTab: () => {},
      onScroll: () => {},
      contentProps: {},
      locked: false,
      prerenderingSiblingsNumber: 0,
      menuFontStyle: {color: "black"},
      menuContainerStyle: {backgroundColor: "white", justifyContent: "center"},
      menuGradientLocations: [0.0, 1.0],
      menuGradientColors: ["transparent", "transparent"],
      isAnimated: true,
      tabColor: "black",
      blendDuration: 500,
      scrollWithoutAnimation: true,
    };
  },

  getInitialState() {
    return {
      currentPage: this.props.initialPage,
      scrollValue: new Animated.Value(this.props.initialPage),
      containerWidth: Dimensions.windowWidth(),
      sceneKeys: this.newSceneKeys({ currentPage: this.props.initialPage, }),
      open: false,
    };
  },

  componentDidMount() {
    const scrollFn = () => {
      if (this.scrollView && Platform.OS === 'android') {
        const x = this.props.initialPage * this.state.containerWidth;
        this.scrollView.scrollTo({ x, animated: false });
      }
    };
    this.setTimeout(() => {
      InteractionManager.runAfterInteractions(scrollFn);
    }, 0);
  },

  componentWillReceiveProps(props) {
    if (props.children !== this.props.children) {
      this.updateSceneKeys({ page: this.state.currentPage, children: props.children, });
    }

    if (props.page >= 0 && props.page !== this.state.currentPage) {
      this.goToPage(props.page);
    }
  },

  animateClose() {
    Animated.timing(
      menuOpacity,
      {
        toValue: 0.0,
        duration: this.props.blendDuration,

      }
    ).start()
    Animated.timing(
      menuOffset,
      {
        toValue: -Dimensions.windowWidth(),
        duration: this.props.isAnimated? 200 : 0,
      }
    ).start()
  },

  animateOpen() {
    Animated.timing(
      menuOpacity,
      {
        toValue: 1.0,
        duration: this.props.blendDuration,

      }
    ).start()
    Animated.timing(
      menuOffset,
      {
        toValue: 0.0,
        duration: this.props.isAnimated? 200 : 0,
      }
    ).start()
  },

  goToPage(pageNumber) {
    const offset = pageNumber * this.state.containerWidth;
    if (this.scrollView) {
      this.scrollView.scrollTo({x: offset, y: 0, animated: !this.props.scrollWithoutAnimation, });
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber),
    });

    this.setState({
      open: false,
    })

    this.animateClose()
  },

  updateSceneKeys({ page, children = this.props.children, callback = () => {}, }) {
    let newKeys = this.newSceneKeys({ previousKeys: this.state.sceneKeys, currentPage: page, children, });
    this.setState({currentPage: page, sceneKeys: newKeys, }, callback);
  },

  newSceneKeys({ previousKeys = [], currentPage = 0, children = this.props.children, }) {
    let newKeys = [];
    this._children(children).forEach((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      if (this._keyExists(previousKeys, key) ||
        this._shouldRenderSceneKey(idx, currentPage)) {
        newKeys.push(key);
      }
    });
    return newKeys;
  },

  _shouldRenderSceneKey(idx, currentPageKey) {
    let numOfSibling = this.props.prerenderingSiblingsNumber;
    return (idx < (currentPageKey + numOfSibling + 1) &&
      idx > (currentPageKey - numOfSibling - 1));
  },

  _keyExists(sceneKeys, key) {
    return sceneKeys.find((sceneKey) => key === sceneKey);
  },

  _makeSceneKey(child, idx) {
    return child.props.tabLabel + '_' + idx;
  },

  renderScrollableContent() {
    const scenes = this._composeScenes();
    return <ScrollView
      horizontal
      pagingEnabled
      automaticallyAdjustContentInsets={false}
      contentOffset={{ x: this.props.initialPage * this.state.containerWidth, }}
      ref={(scrollView) => { this.scrollView = scrollView; }}
      onScroll={(e) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        this._updateScrollValue(offsetX / this.state.containerWidth);
      }}
      onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
      onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
      scrollEventThrottle={16}
      scrollsToTop={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={!this.props.locked}
      directionalLockEnabled
      alwaysBounceVertical={false}
      keyboardDismissMode="on-drag"
      {...this.props.contentProps}
      >
      {scenes}
    </ScrollView>;
  },

  _composeScenes() {
    return this._children().map((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      return <SceneComponent
        key={child.key}
        shouldUpdated={this._shouldRenderSceneKey(idx, this.state.currentPage)}
        style={{width: this.state.containerWidth, }}
      >
        {this._keyExists(this.state.sceneKeys, key) ? child : <View tabLabel={child.props.tabLabel}/>}
      </SceneComponent>;
    });
  },

  _onMomentumScrollBeginAndEnd(e) {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / this.state.containerWidth);
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page);
    }
  },

  _updateSelectedPage(nextPage) {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage),
    });
  },

  _onChangeTab(prevPage, currentPage) {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage,
    });
  },

  _updateScrollValue(value) {
    this.state.scrollValue.setValue(value);
    this.props.onScroll(value);
  },

  _handleLayout(e) {
    const { width, } = e.nativeEvent.layout;

    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      this.setState({ containerWidth: width, });
      this.requestAnimationFrame(() => {
        this.goToPage(this.state.currentPage);
      });
    }
  },

  _children(children = this.props.children) {
    return React.Children.map(children, (child) => child);
  },

  renderMenu() {
    return (
      <Menu style={this.props.menuContainerStyle} menuFontStyle={this.props.menuFontStyle} image={this.props.menuImage}  goToPage={this.goToPage} titles={this._children().map((child) => child.props.title)}/>
    )
  },

  toggleMenu() {
    if(this.state.open) {
      this.animateClose()
    } else {
      this.animateOpen()
    }
    this.setState({
      open: !this.state.open
    })
  },

  renderTabButton() {
    return (
      <TabButton onPress={this.toggleMenu} style={{backgroundColor:this.props.tabColor, zIndex: 3, bottom: 10, left: -27.5, position: "absolute", alignItems: "center", justifyContent: "center"}}/>
    )
  },

  render() {
    let overlayTabs = (this.props.tabBarPosition === 'overlayTop' || this.props.tabBarPosition === 'overlayBottom');
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map((child) => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth,
    };

    if (this.props.tabBarBackgroundColor) {
      tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
    }
    if (this.props.tabBarActiveTextColor) {
      tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
    }
    if (this.props.tabBarInactiveTextColor) {
      tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
    }
    if (this.props.tabBarTextStyle) {
      tabBarProps.textStyle = this.props.tabBarTextStyle;
    }
    if (this.props.tabBarUnderlineStyle) {
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0,
      };
    }
    var zMenu: number = menuOpacity.value
    var zContent: number = 1.0 - zMenu
    return (
      <View style={[styles.container, this.props.style, ]} onLayout={this._handleLayout}>
        <Animated.Image source={this.props.backgroundImage} style={{backgroundColor: "transparent", opacity: 1.0, position: "absolute", width: Dimensions.windowWidth(), height: Dimensions.windowHeight(), zIndex: zContent}}>
          {this.renderScrollableContent()}
        </Animated.Image>
        <Animated.Image source={this.props.menuImage} style={{backgroundColor: "white", opacity: menuOpacity, left: menuOffset, zIndex: zMenu, position: "absolute", width: Dimensions.windowWidth(), height: Dimensions.windowHeight(), alignItems: "center", justifyContent: "center"}}>
          <LinearGradient style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}} colors={this.props.menuGradientColors} locations={this.props.menuGradientLocations}>
            {this.renderMenu()}
          </LinearGradient>
        </Animated.Image>
        {this.renderTabButton()}
      </View>
    )
  },
});

module.exports = ScrollableTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentAndroid: {
    flex: 1,
  },
});
