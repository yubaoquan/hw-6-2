import React from 'react';
import {useEffect, useState} from 'react';
import {categories} from '../config/categories';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {fetchNews} from '../api/index';

interface Tab {
  title: string;
}

const TabsComponent = ({tabs}: {tabs: Tab[]}) => {
  const handleTabTap = tab => {
    console.info('tab click', tab);
  };

  return (
    <ScrollView style={styles.scrollContainer} horizontal={true}>
      <View style={styles.container}>
        {tabs.map(tab => {
          return (
            <Text
              key={tab.id}
              style={styles.tab}
              onPress={() => handleTabTap(tab)}>
              {tab.title}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

const NewsList = ({list}) => {
  return (
    <ScrollView>
      {list.map(item => {
        return (
          <View key={item.uniquekey} style={styles.newsItem}>
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const tabs = categories.map(category => {
  return {
    ...category,
    news: [],
    page: 0,
  };
});

const Page = () => {
  const [news, setNews] = useState([]);
  const initNews = async () => {
    const newsData = await fetchNews({page: 1, type: 'top'});
    setNews(newsData);
  };
  useEffect(() => {
    initNews();
  }, []);

  return (
    <>
      <TabsComponent tabs={tabs} />
      <NewsList list={news} />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  tab: {
    fontSize: 24,
    padding: 5,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
    color: '#fff',
    height: 40,
  },
  newsItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
});
