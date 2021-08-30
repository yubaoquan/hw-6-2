import React from 'react';
import WebView from 'react-native-webview';

const NewsDetail = ({route}) => {
  const url = decodeURI(route.params.url);
  console.info(url);
  return <WebView source={{uri: url}} />;
};

export default NewsDetail;
