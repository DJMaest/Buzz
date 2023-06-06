// Create settings component using react-native-paper
import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Portal, ProgressBar, MD3Colors } from 'react-native-paper';
import customTheme from '../buzzTheme';

function Settings() {
    const [masterKey, setMasterKey] = React.useState('');
    const [showProgress, setShowProgress] = React.useState(false);
    function handleMasterKeyUpdate() {
        // setMasterKey(text);
        setShowProgress(true);
        setTimeout(() => {
            setShowProgress(false);
        }, 3000);
        console.log('Master key updated');
    }
    return (
        <>
            <View style={styles.updateContainer}>
                <TextInput value={masterKey} onChangeText={setMasterKey} placeholder='Enter Master Key' label="Master Key" secureTextEntry={true} />
                <Button style={styles.loginBtn} mode='contained' onPress={() => handleMasterKeyUpdate()}>Update Master Key</Button>

            </View>
            <Modal presentationStyle='overFullScreen' style={{ alignContent: 'center' }} visible={showProgress} transparent={true} >
                <View style={styles.progressContainer}>
                    <ProgressBar style={styles.ProgressBar} progress={0.5} color={MD3Colors.primary50} />
                    <Text style={{color:'white', alignSelf:'center'}}>Re-encrypting database</Text>
                </View>

            </Modal>
        </>

    );
}
const styles = StyleSheet.create({
    updateContainer: {
        margin: 20
    },
    loginBtn: {
        marginTop: 20,
        backgroundColor: customTheme.colors.inversePrimary
    },
    ProgressBar: {
        marginTop: '50%',
        marginHorizontal: 20,
        alignSelf: 'center'
    },
    progressContainer: {
        height: '100%',
        padding: 20,
        backgroundColor: customTheme.colors.inverseSurface,
        opacity: 0.8,
    }
});

export default Settings;