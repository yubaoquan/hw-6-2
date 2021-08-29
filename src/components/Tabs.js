import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const TabsComponent = ({tabs, activeId, onTabClick}) => {
  const handleTabTap = tab => {
    onTabClick(tab.id);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        <View style={styles.container}>
          {tabs.map(tab => {
            const tabStyle = [styles.tab];
            if (tab.id === activeId) {
              tabStyle.push(styles.tabActive);
            }
            return (
              <Text
                key={tab.id}
                style={tabStyle}
                onPress={() => handleTabTap(tab)}>
                {tab.title}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: 60,
  },
  scrollContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tab: {
    fontSize: 20,
    padding: 10,
    color: '#000',
    height: 40,
  },
  tabActive: {
    backgroundColor: '#ddfdbb',
    color: '#F83E2D',
  },
});

export default TabsComponent;
