import React from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

const NewsList = ({list, onReachBottom, onRefresh, refreshing}) => {
  const renderItem = ({item}) => {
    const {imgs = [], title, author, date, url, uniquekey} = item;

    const titleRow = (
      <View>
        <Text style={styles.titlePreView}>{title}</Text>
      </View>
    );

    const row2 = (
      <View style={styles.row2}>
        <View style={styles.row2L}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <Image
          style={styles.like}
          source={require('./like.png')}
          catchtap="handleLikeClick"
        />
      </View>
    );

    const gt2 = (
      <>
        {titleRow}
        <View style={styles.imgs}>
          {imgs.map((img, idx) => {
            return (
              <Image
                style={styles.imgBig}
                source={{uri: img}}
                key={img + idx}
              />
            );
          })}
        </View>
        {row2}
      </>
    );

    const leftStyle = [styles.left];
    if (imgs.length === 1) {
      leftStyle.push(styles.left1);
    }
    if (imgs.length === 2) {
      leftStyle.push(styles.left2);
    }

    const le2 = (
      <View style={styles.newsItem2}>
        <View style={leftStyle}>
          {titleRow}
          {row2}
        </View>
        <View style={styles.rightImgs}>
          {imgs.map((img, idx) => (
            <Image
              style={styles.imgSmall}
              source={{uri: img}}
              key={img + idx}
            />
          ))}
        </View>
      </View>
    );

    return (
      <View key={uniquekey} style={styles.newsItem}>
        {imgs.length > 2 ? gt2 : le2}
      </View>
    );
  };

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.uniquekey}
      onEndReached={onReachBottom}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  newsItem: {
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
  },
  titlePreView: {
    maxWidth: windowWidth,
    fontSize: 14,
    marginBottom: 10,
  },
  imgs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  row2L: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 16,
  },
  author: {
    fontSize: 12,
  },
  date: {
    marginRight: 10,
    fontSize: 12,
  },
  like: {
    width: 16,
    height: 16,
  },
  newsItem2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  left1: {
    width: windowWidth * 0.7,
  },
  left2: {
    width: windowWidth * 0.5,
  },
  imgBig: {
    width: windowWidth * 0.3,
    height: 80,
  },
  rightImgs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexShrink: 0,
    flexGrow: 2,
  },
  imgSmall: {
    height: 50,
    width: 50,
  },
});

export default NewsList;
