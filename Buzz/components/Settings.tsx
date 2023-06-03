// Create settings component using react-native-paper
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import customTheme from '../buzzTheme';

function Settings() {
    const [masterKey, setMasterKey] = React.useState('');
    function handleMasterKeyUpdate() {
        // setMasterKey(text);
        console.log('Master key updated');
    }
    return (
        <View style={styles.updateContainer}>
            <TextInput value={masterKey} onChangeText={setMasterKey} placeholder='Enter Master Key' label="Master Key" secureTextEntry={true} />
            <Button style={styles.loginBtn} mode='contained' onPress={() => handleMasterKeyUpdate()}>Update Master Key</Button>
        </View>
    );
}
const styles = StyleSheet.create({
    updateContainer: {
        margin: 20
    },
    loginBtn: {
        marginTop: 20,
        backgroundColor: customTheme.colors.inversePrimary
    }
});

export default Settings;