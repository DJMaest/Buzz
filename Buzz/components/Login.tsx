import React, { useEffect } from 'react';
import { Button, TextInput, Provider as PaperProvider } from "react-native-paper";
import {
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import customTheme from '../buzzTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// add type safety to navigation props
type StackParamList = {
    Login: undefined;
    Home: undefined;
  };

type LoginScreenNavigationProp = NativeStackScreenProps<
  StackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

// navigate to home screen on button press
function Login({ navigation }: Props): JSX.Element {
    return (
        <PaperProvider theme={customTheme}>
            <SafeAreaView>
                <View style={styles.container}>
                    <TextInput placeholder='Enter Master Key' label="Master Key" secureTextEntry={true} />
                    <Button style={styles.loginBtn} mode='contained' onPress={() => navigation.navigate('Home')}>Create Access</Button>
                </View>

            </SafeAreaView>
        </PaperProvider>

    )
}
const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    loginBtn: {
        margin: 20
    }
});

export default Login;