/**
 * Buzz Password Manager
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {

  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
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
import { FAB, Provider as PaperProvider, Appbar, List, Portal, Button, Modal, Text, TextInput, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PassCard from './components/PassCard';
import DatabaseHandler from './model/Credential';


function App(): JSX.Element {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [userNameText, setUserNameText] = React.useState<string>('');
  const [passwordText, setPasswordText] = React.useState<string>('');
  const [urlText, setUrlText] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');
  const [passData, setPassData] = React.useState<any[]>([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const hideDeleteModal = () => setDeleteVisible(false);
  const showDeleteModal = () => setDeleteVisible(true);

  useEffect(() => {
    const db = new DatabaseHandler();
    db.createTable();
    // db.insertData('https://www.google.com', 'test', 'test');
    db.getAllData((data: any) => setPassData(data));
  }, []);

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBar}>

          <Appbar.Content title="Buzz Password Manager" />
          {/* TODO: BLE sync feature coming in next release  */}
          {/* <Icon name="bluetooth" size={24} style={styles.appBarIcon} /> */}

        </Appbar>
        <Searchbar onChangeText={setSearchText} style={styles.searchBar} placeholder='Search for credentials' value={searchText} />
        <ScrollView style={styles.passContainer}>
          {passData !== undefined && passData.map((item: any) => { return <PassCard btnKey={item} showDeleteModal={showDeleteModal} key={item.id} url={item.url} username={item.username} password={item.password} /> })}
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => showModal()}
        />
      </SafeAreaView>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <TextInput style={styles.containerInput} onChangeText={setUrlText} value={urlText} placeholder='Enter URL' label="URL" />
          <TextInput style={styles.containerInput} onChangeText={setUserNameText} value={userNameText} placeholder='Enter Username' label="Username" />
          <TextInput style={styles.containerInput} onChangeText={setPasswordText} value={passwordText} placeholder='Enter Password' label="Password" secureTextEntry={true} />
          <Button style={styles.containerBtn} mode="contained" onPress={() => hideModal()}> Add </Button>
          <Button style={styles.containerBtn} mode="contained" onPress={() => hideModal()}> Cancel </Button>
        </Modal>
      </Portal>

      <Portal>
        <Modal visible={deleteVisible} onDismiss={hideDeleteModal} contentContainerStyle={styles.containerStyle}>
          <Text style={{ fontSize: 15, margin: 5 }} variant='labelSmall'>Are you sure you want to delete credential?</Text>
          <Button buttonColor={customTheme.colors.inversePrimary} style={styles.containerBtn} mode="contained" onPress={() => hideDeleteModal()}> Delete </Button>
          <Button buttonColor={customTheme.colors.secondary} style={styles.containerBtn} mode="contained" onPress={() => hideDeleteModal()}> Cancel </Button>
        </Modal>
      </Portal>

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
  passContainer: {
    margin: 5
  },
  appBar: {
    flexDirection: 'row',
  },
  appBarIcon: {
    marginRight: 8,
    color: 'blue'
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10
  },
  containerBtn: {
    margin: 5
  },
  containerInput: {
    margin: 5
  },
  searchBar: {
    margin: 5
  }

});

export default App;
