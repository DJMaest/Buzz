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
import {
  FAB, Provider as PaperProvider, Appbar, List,
  Portal, Button, Modal, Text, TextInput, Searchbar,
  Snackbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PassCard from './components/PassCard';
import DatabaseHandler from './model/Credential';


function App(): JSX.Element {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [userNameText, setUserNameText] = React.useState<string>('');
  const [passwordText, setPasswordText] = React.useState<string>('');
  const [deleteId, setDeleteId] = React.useState<number>(-1);
  const [urlText, setUrlText] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');
  const [passData, setPassData] = React.useState<any[]>([]);
  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [urlEditText, setUrlEditText] = React.useState<string>('');
  const [usernameEditText, setUsernameEditText] = React.useState<string>('');
  const [passwordEditText, setPasswordEditText] = React.useState<string>('');
  const [editVisible, setEditVisible] = React.useState<boolean>(false);

  const db = new DatabaseHandler();
  useEffect(() => {
    db.createTable();
    // db.insertData('https://www.google.com', 'test', 'test');
    // db.insertData('https://www.facebook.com', 'test', 'test');
    // db.insertData('https://www.instagram.com', 'test3', 'test');
    db.getAllData((data: any) => setPassData(data));
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const hideDeleteModal = () => setDeleteVisible(false);
  function showDeleteModal(id: number) {
    setDeleteId(id);
    setDeleteVisible(true);
  }

  function hideEditModal() {
    setEditVisible(false);
    setUrlEditText('');
    setUsernameEditText('');
    setPasswordEditText('');
  }

  function showEditModal() {
    // setDeleteId(id);
    setEditVisible(true);
  }

  function deleteCredential(): void {
    db.deleteData(deleteId);
    filterCredential(searchText);
    hideDeleteModal();
  }



  function filterCredential(text: string): void {
    setSearchText(text);
    if (text === '')
      db.getAllData((data: any) => setPassData(data));
    else {
      db.filterData(text, (data: any) => setPassData(data));
    }

  }

  function addCredential(url: string, username: string, password: string): void {
    if (url === '' || username === '' || password === '') {
      setSnackbarVisible(true);
      return;
    }
    db.insertData(url, username, password);
    filterCredential(searchText);
    hideModal();
    setUrlText('');
    setUserNameText('');
    setPasswordText('');
  }

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBar}>

          <Appbar.Content title="Buzz Password Manager" />
          {/* TODO: BLE sync feature coming in next release  */}
          {/* <Icon name="bluetooth" size={24} style={styles.appBarIcon} /> */}

        </Appbar>
        <Searchbar onChangeText={filterCredential} style={styles.searchBar} placeholder='Search for credentials' value={searchText} />
        <ScrollView style={styles.passContainer}>
          {passData !== undefined && passData.map((item: any) => {
            return <PassCard
              btnKey={item}
              showDeleteModal={() => showDeleteModal(item.id)}
              showEditModal={() => showEditModal()}
              key={item.id}
              url={item.url}
              username={item.username}
              password={item.password}
            />
          })}
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => showModal()}
        />
      </SafeAreaView>
      {/* Add modal */}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <TextInput style={styles.containerInput} onChangeText={setUrlText} value={urlText} placeholder='Enter URL' label="URL" />
          <TextInput style={styles.containerInput} onChangeText={setUserNameText} value={userNameText} placeholder='Enter Username' label="Username" />
          <TextInput style={styles.containerInput} onChangeText={setPasswordText} value={passwordText} placeholder='Enter Password' label="Password" secureTextEntry={true} />
          <Button buttonColor={customTheme.colors.inversePrimary} style={styles.containerBtn} mode="contained" onPress={() => addCredential(urlText, userNameText, passwordText)}> Add </Button>
          <Button style={styles.containerBtn} mode="contained" onPress={() => hideModal()}> Cancel </Button>
        </Modal>
      </Portal>
      {/* Delete modal */}
      <Portal>
        <Modal visible={deleteVisible} onDismiss={hideDeleteModal} contentContainerStyle={styles.containerStyle}>
          <Text style={{ fontSize: 15, margin: 5 }} variant='labelSmall'>Are you sure you want to delete credential?</Text>
          <Button buttonColor={customTheme.colors.inversePrimary} style={styles.containerBtn} mode="contained" onPress={() => deleteCredential()}> Delete </Button>
          <Button buttonColor={customTheme.colors.secondary} style={styles.containerBtn} mode="contained" onPress={() => hideDeleteModal()}> Cancel </Button>
        </Modal>
      </Portal>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setSnackbarVisible(false);
          }
        }}
        duration={3000}
      >
        Please enter all the fields
      </Snackbar>
      {/* Edit modal */}
      <Portal>
        <Modal visible={editVisible} onDismiss={hideEditModal} contentContainerStyle={styles.containerStyle}>
          <TextInput style={styles.containerInput} onChangeText={setUrlEditText} value={urlEditText} placeholder='Enter URL' label="URL" />
          <TextInput style={styles.containerInput} onChangeText={setUsernameEditText} value={usernameEditText} placeholder='Enter Username' label="Username" />
          <TextInput style={styles.containerInput} onChangeText={setPasswordEditText} value={passwordEditText} placeholder='Enter Password' label="Password" secureTextEntry={true} />
          <Button buttonColor={customTheme.colors.inversePrimary} style={styles.containerBtn} mode="contained" onPress={() => console.log('pressed')}> Save </Button>
          <Button style={styles.containerBtn} mode="contained" onPress={() => hideEditModal()}> Cancel </Button>
        </Modal>
      </Portal>
    </PaperProvider >

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
