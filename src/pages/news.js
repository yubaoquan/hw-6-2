import React from 'react';
import {useEffect, useState} from 'react';
import {categories} from '../config/categories';

import TabsComponent from '../components/Tabs';
import NewsList from '../components/NewsList';
import {fetchNews} from '../api/index';
import {Text} from 'react-native';

// 接口返回空数据时调试用
const fakeData = [
  {
    title: 'bb机',
    url: 'https://www.baidu.com',
    author: '新华社',
    date: '2020-09-01 11:22:33',
    imgs: [
      'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
      'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
      'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
    ],
  },
  {
    title: 'bb机2张图',
    url: 'https://www.baidu.com',
    author: '新华社',
    date: '2020-09-01 11:22:33',
    imgs: [
      'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
      'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
    ],
  },
  {
    title: 'bb机1张图',
    url: 'https://www.baidu.com',
    author: '新华社',
    date: '2020-09-01 11:22:33',
    imgs: ['http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg'],
  },
];

const tabs = categories.map(category => {
  return {
    ...category,
    news: [],
    page: 0,
  };
});

const initNewsCollection = tabs.reduce((all, tab) => {
  all[tab.id] = {
    news: [],
    page: 0,
  };
  return all;
}, {});

const NewsPage = () => {
  const [news, setNews] = useState(initNewsCollection);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [refreshing, setRefreshing] = useState(false);
  const handleTabClick = id => setActiveTabId(id);

  const {id: type} = tabs.find(tab => tab.id === activeTabId) || tabs[0];
  const currentPage = news[type];

  const initNews = async loadNextPage => {
    console.info('currentPage is', currentPage);
    if (currentPage.news.length && !loadNextPage) {
      console.info(`already fetched of id ${activeTabId}`);
      return;
    }
    console.info('fetch news', activeTabId);
    setRefreshing(true);
    const newsData = await fetchNews({page: currentPage.page + 1, type});

    const nextPageNews =
      newsData?.map(item => {
        const newsItem = {
          title: item.title,
          url: encodeURI(item.url),
          author: item.author_name,
          date: item.date,
          imgs: [],
        };

        if (item.thumbnail_pic_s) {
          newsItem.imgs.push(item.thumbnail_pic_s);
        }
        if (item.thumbnail_pic_s02) {
          newsItem.imgs.push(item.thumbnail_pic_s02);
        }
        if (item.thumbnail_pic_s03) {
          newsItem.imgs.push(item.thumbnail_pic_s03);
        }

        return newsItem;
      }) || fakeData;

    console.info('before setNews', currentPage, nextPageNews);

    const newNews = {
      ...news,
      [type]: {
        news: [...currentPage.news, ...nextPageNews],
        page: currentPage.page + 1,
      },
    };

    console.info('new news', newNews);

    setNews(newNews);
    setRefreshing(false);
  };

  useEffect(() => {
    initNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId]);

  const handleNewsReachBottom = () => {
    console.info('新闻列表触底, 加载下一页');
    initNews(true);
  };

  const handlePullDown = () => {
    console.info('pull down refresh');
    setNews({
      ...news,
      [type]: {
        news: [],
        page: 0,
      },
    });
    initNews();
  };

  return (
    <>
      <TabsComponent
        tabs={tabs}
        activeId={activeTabId}
        onTabClick={handleTabClick}
      />
      <NewsList
        list={news[activeTabId].news}
        onReachBottom={handleNewsReachBottom}
        onRefresh={handlePullDown}
        refreshing={refreshing}
      />
    </>
  );
};

export default NewsPage;
