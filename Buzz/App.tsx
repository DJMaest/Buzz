/**
 * Buzz Password Manager
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import customTheme from './buzzTheme';
import { FAB, Provider as PaperProvider, Appbar, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PassCard from './components/PassCard';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBar}>
          
          <Appbar.Content title="Buzz Password Manager" />
          <Icon name="bluetooth" size={24} style={styles.appBarIcon} />

        </Appbar>
        <ScrollView style={styles.passContainer}>
          <PassCard title="https://www.google.com" password="*****" />
          <PassCard title="https://www.facebook.com" password="*****" />
          <PassCard title="https://www.twitter.com" password="*****" />
          <PassCard title="https://www.instagram.com" password="*****" />
          <PassCard title="https://www.linkedin.com" password="*****" />
          <PassCard title="https://www.github.com" password="*****" />
          <PassCard title="https://www.youtube.com" password="*****" />
          <PassCard title="https://www.netflix.com" password="*****" />
          <PassCard title="https://www.spotify.com" password="*****" />
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
      </SafeAreaView>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
  },
  passContainer:{
    margin: 5
  },
  appBar:{
    flexDirection: 'row',
  },
  appBarIcon:{
    marginRight: 8,
    color:'blue'
  }
});

export default App;
