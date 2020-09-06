import React, { Children, createElement } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Graphic from 'unicon-react'

import * as Icons from './icons'

export default class App extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {Object.keys(Icons).map((key) => (
          <View key={key} style={styles.child}>
            <Graphic source={Icons[key]} scale={4} fill="none" />
            <Text style={{ marginTop: 16 }}>{key}</Text>
          </View>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#3FA86B',
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  child: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})
