/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/home';
import NewsPage from './src/pages/news';
import ThirdPage from './src/pages/third';
import ProfilePage from './src/pages/profile';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const App: () => Node = () => {
  console.info('hello this is succeed 3');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {Navigator, Screen} = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="news"
        screenOptions={({route}) => {
          return {
            tabBarIcon({focused, color, size}) {},
          };
        }}>
        <Screen
          name="home"
          component={HomePage}
          options={{
            title: '首页',
          }}
        />
        <Screen
          name="news"
          component={NewsPage}
          options={{
            title: '新闻',
          }}
        />
        <Screen
          name="third"
          component={ThirdPage}
          options={{
            title: '朋友圈',
          }}
        />
        <Screen
          name="profile"
          component={ProfilePage}
          options={{
            title: '我的',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
