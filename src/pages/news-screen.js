import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewsList from './news-list';
import NewsDetail from './news-detail';

const NewsScreen = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator>
      <Screen
        name="news-list"
        component={NewsList}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="news-detail"
        component={NewsDetail}
        options={{
          title: '新闻详情',
          headerBackTitle: '返回',
        }}
      />
    </Navigator>
  );
};

export default NewsScreen;
