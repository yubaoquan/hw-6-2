/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/home';
import NewsPage from './src/pages/news-screen';
import ThirdPage from './src/pages/third';
import ProfilePage from './src/pages/profile';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const App: () => Node = () => {
  console.info('hello this is succeed 3');

  const {Navigator, Screen} = createBottomTabNavigator();

  const normalIcons = {
    home: require('./src/static/home.png'),
    news: require('./src/static/book.png'),
    third: require('./src/static/list.png'),
    profile: require('./src/static/profile.png'),
  };

  const activeIcons = {
    home: require('./src/static/home-active.png'),
    news: require('./src/static/book-active.png'),
    third: require('./src/static/list-active.png'),
    profile: require('./src/static/profile-active.png'),
  };

  return (
    <NavigationContainer>
      <Navigator initialRouteName="news">
        <Screen
          name="home"
          component={HomePage}
          options={{
            title: '首页',
            tabBarIcon({focused, color, size}) {
              return (
                <Image
                  source={focused ? activeIcons.home : normalIcons.home}
                  style={styles.navIcon}
                />
              );
            },
          }}
        />
        <Screen
          name="news"
          component={NewsPage}
          options={{
            title: '新闻',
            tabBarIcon({focused, color, size}) {
              return (
                <Image
                  source={focused ? activeIcons.news : normalIcons.news}
                  style={styles.navIcon}
                />
              );
            },
          }}
        />
        <Screen
          name="third"
          component={ThirdPage}
          options={{
            title: '朋友圈',
            tabBarIcon({focused, color, size}) {
              return (
                <Image
                  source={focused ? activeIcons.third : normalIcons.third}
                  style={styles.navIcon}
                />
              );
            },
          }}
        />
        <Screen
          name="profile"
          component={ProfilePage}
          options={{
            title: '我的',
            tabBarIcon({focused, color, size}) {
              return (
                <Image
                  source={focused ? activeIcons.profile : normalIcons.profile}
                  style={styles.navIcon}
                />
              );
            },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    width: 20,
    height: 20,
  },
});

export default App;
